const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./quiz.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Create database tables
function initDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            level INTEGER NOT NULL,
            score INTEGER,
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE(user_id, level)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS user_answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            level INTEGER NOT NULL,
            question_index INTEGER NOT NULL,
            selected_answer INTEGER NOT NULL,
            is_correct BOOLEAN NOT NULL,
            answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    console.log('Database tables initialized');
}

// User Registration
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ error: 'Username or email already exists' });
                    }
                    return res.status(500).json({ error: 'Registration failed' });
                }

                res.json({
                    success: true,
                    userId: this.lastID,
                    username: username
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json({
                success: true,
                userId: user.id,
                username: user.username,
                email: user.email
            });
        }
    );
});

// Get user progress
app.get('/api/progress/:userId', (req, res) => {
    const { userId } = req.params;

    db.all(
        'SELECT level, score, completed_at FROM user_progress WHERE user_id = ? ORDER BY level',
        [userId],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch progress' });
            }

            const progress = {};
            rows.forEach(row => {
                progress[row.level] = {
                    score: row.score,
                    completedAt: row.completed_at
                };
            });

            res.json({ progress });
        }
    );
});

// Save level completion
app.post('/api/complete-level', (req, res) => {
    const { userId, level, score } = req.body;

    if (!userId || !level || score === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        `INSERT INTO user_progress (user_id, level, score) 
         VALUES (?, ?, ?)
         ON CONFLICT(user_id, level) 
         DO UPDATE SET score = ?, completed_at = CURRENT_TIMESTAMP`,
        [userId, level, score, score],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save progress' });
            }

            res.json({
                success: true,
                message: 'Progress saved successfully'
            });
        }
    );
});

// Save individual answer
app.post('/api/save-answer', (req, res) => {
    const { userId, level, questionIndex, selectedAnswer, isCorrect } = req.body;

    db.run(
        'INSERT INTO user_answers (user_id, level, question_index, selected_answer, is_correct) VALUES (?, ?, ?, ?, ?)',
        [userId, level, questionIndex, selectedAnswer, isCorrect ? 1 : 0],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save answer' });
            }

            res.json({ success: true });
        }
    );
});

// Get user statistics
app.get('/api/stats/:userId', (req, res) => {
    const { userId } = req.params;

    db.all(
        `SELECT 
            COUNT(DISTINCT level) as completed_levels,
            AVG(score) as avg_score,
            SUM(CASE WHEN score >= 90 THEN 1 ELSE 0 END) as perfect_levels
         FROM user_progress 
         WHERE user_id = ?`,
        [userId],
        (err, stats) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch stats' });
            }

            res.json({
                completedLevels: stats[0].completed_levels || 0,
                avgScore: Math.round(stats[0].avg_score || 0),
                perfectLevels: stats[0].perfect_levels || 0
            });
        }
    );
});

// Serve the quiz HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
