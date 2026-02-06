// API configuration - works both locally and in production
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api';

// State management
let currentUser = null;
let currentLevel = 1;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let levelScores = {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (from sessionStorage)
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserProgress();
    }

    // Add enter key listeners for login/register
    document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    document.getElementById('regPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleRegister();
    });
});

// Authentication functions
function showLogin() {
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    clearMessages();
}

function showRegister() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
    clearMessages();
}

function clearMessages() {
    document.getElementById('loginError')?.classList.add('hidden');
    document.getElementById('registerError')?.classList.add('hidden');
    document.getElementById('registerSuccess')?.classList.add('hidden');
}

async function handleRegister() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    const errorEl = document.getElementById('registerError');
    const successEl = document.getElementById('registerSuccess');

    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

    if (!username || !email || !password) {
        errorEl.textContent = 'All fields are required';
        errorEl.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            successEl.textContent = 'Registration successful! Please login.';
            successEl.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('regUsername').value = '';
                document.getElementById('regEmail').value = '';
                document.getElementById('regPassword').value = '';
                showLogin();
            }, 1500);
        } else {
            errorEl.textContent = data.error || 'Registration failed';
            errorEl.classList.remove('hidden');
        }
    } catch (error) {
        errorEl.textContent = 'Connection error. Please try again.';
        errorEl.classList.remove('hidden');
    }
}

async function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const errorEl = document.getElementById('loginError');
    errorEl.classList.add('hidden');

    if (!username || !password) {
        errorEl.textContent = 'Username and password required';
        errorEl.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data;
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
            loadUserProgress();
        } else {
            errorEl.textContent = data.error || 'Login failed';
            errorEl.classList.remove('hidden');
        }
    } catch (error) {
        errorEl.textContent = 'Connection error. Please try again.';
        errorEl.classList.remove('hidden');
    }
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    document.getElementById('levelScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
}

async function loadUserProgress() {
    if (!currentUser) return;

    try {
        const response = await fetch(`${API_URL}/progress/${currentUser.userId}`);
        const data = await response.json();

        levelScores = {};
        Object.keys(data.progress).forEach(level => {
            levelScores[level] = data.progress[level].score;
        });

        showLevelScreen();
    } catch (error) {
        console.error('Error loading progress:', error);
        showLevelScreen();
    }
}

function showLevelScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('levelScreen').classList.remove('hidden');
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');

    document.getElementById('userNameDisplay').textContent = currentUser.username;
    renderLevels();
    updateStats();
}

function renderLevels() {
    const levelsGrid = document.getElementById('levelsGrid');
    levelsGrid.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const level = levels[i];
        const isCompleted = levelScores[i] !== undefined;

        const card = document.createElement('div');
        card.className = 'level-card' + (isCompleted ? ' completed' : '');
        card.onclick = () => selectLevel(i);

        card.innerHTML = `
            <div class="level-icon">${level.icon}</div>
            <div class="level-title">${level.title}</div>
            <div class="level-description">${level.description}</div>
            <div class="level-questions">12 Questions</div>
            ${isCompleted ? `
                <div class="completed-badge">✓ Completed</div>
                <div class="level-score">Score: ${levelScores[i]}%</div>
            ` : ''}
        `;

        levelsGrid.appendChild(card);
    }
}

function updateStats() {
    const completedLevels = Object.keys(levelScores).length;
    document.getElementById('levelsCompleted').textContent = `${completedLevels}/4`;

    if (completedLevels > 0) {
        const totalScore = Object.values(levelScores).reduce((a, b) => a + b, 0);
        const avgScore = Math.round(totalScore / completedLevels);
        document.getElementById('totalScore').textContent = `${avgScore}%`;
    } else {
        document.getElementById('totalScore').textContent = '0%';
    }
}

function selectLevel(level) {
    currentLevel = level;
    currentQuestion = 0;
    score = 0;

    document.getElementById('levelScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');

    document.getElementById('levelTitle').textContent = levels[level].title;
    document.getElementById('quizUserName').textContent = currentUser.username;

    loadQuestion();
}

function loadQuestion() {
    const question = levels[currentLevel].questions[currentQuestion];
    document.getElementById('questionNumber').textContent =
        `Question ${currentQuestion + 1} of ${levels[currentLevel].questions.length}`;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    updateProgress();
    selectedAnswer = null;
    document.getElementById('nextButton').disabled = true;
}

async function selectOption(index) {
    const options = document.querySelectorAll('.option');
    const question = levels[currentLevel].questions[currentQuestion];

    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
        opt.classList.add('disabled');
    });

    selectedAnswer = index;
    const isCorrect = index === question.correct;

    if (isCorrect) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    // Save answer to database
    if (currentUser) {
        try {
            await fetch(`${API_URL}/save-answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.userId,
                    level: currentLevel,
                    questionIndex: currentQuestion,
                    selectedAnswer: index,
                    isCorrect: isCorrect
                })
            });
        } catch (error) {
            console.error('Error saving answer:', error);
        }
    }

    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < levels[currentLevel].questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / levels[currentLevel].questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

async function showResults() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');

    const totalQuestions = levels[currentLevel].questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Save score to database
    if (currentUser) {
        try {
            await fetch(`${API_URL}/complete-level`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.userId,
                    level: currentLevel,
                    score: percentage
                })
            });

            // Update local scores
            levelScores[currentLevel] = percentage;
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    document.getElementById('resultUserName').textContent = currentUser.username;
    document.getElementById('scoreDisplay').textContent = percentage + '%';

    let message = '';
    if (percentage >= 90) {
        message = 'Outstanding! You\'re mastering this level! 🌟';
    } else if (percentage >= 70) {
        message = 'Great job! You really know your stuff! 👏';
    } else if (percentage >= 50) {
        message = 'Good effort! Keep learning! 📚';
    } else {
        message = 'Keep practicing! You\'ll improve! 💪';
    }

    document.getElementById('scoreMessage').textContent = message;
    document.getElementById('correctCount').textContent = score;
    document.getElementById('incorrectCount').textContent = totalQuestions - score;
    document.getElementById('totalCount').textContent = totalQuestions;
}

function backToLevels() {
    showLevelScreen();
}

// Event listener for next button
document.getElementById('nextButton')?.addEventListener('click', nextQuestion);