# Machine Learning Quiz Application

A full-stack quiz application with user authentication, progress tracking, and 4 difficulty levels covering Machine Learning topics.

## Features

✨ **User Authentication**
- Register with username, email, and password
- Secure login system with bcrypt password hashing
- Session persistence

📊 **Progress Tracking**
- Save scores for each completed level
- Track overall progress across all levels
- Resume anytime - no need to complete in one session

🎯 **4 Difficulty Levels**
- **Level 1: Beginner** - ML Fundamentals & Basic Concepts
- **Level 2: Intermediate** - Algorithms & Model Evaluation
- **Level 3: Advanced** - Deep Learning & Neural Networks
- **Level 4: Expert** - Advanced Topics & Research

🎨 **Modern UI**
- Responsive design works on all devices
- Beautiful gradient interface
- Completed levels highlighted in green
- Real-time score tracking

## Tech Stack

### Backend
- **Node.js** with Express.js
- **SQLite** database for data persistence
- **bcryptjs** for password encryption
- **CORS** enabled for API access

### Frontend
- Pure HTML/CSS/JavaScript (no frameworks)
- Modern ES6+ JavaScript
- Responsive design
- Session storage for user state

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express
- sqlite3
- bcryptjs
- cors
- nodemon (for development)

### Step 2: Start the Server

**Development mode** (auto-restart on changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Database Structure

The application uses SQLite with 3 main tables:

### users
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `created_at` - Registration timestamp

### user_progress
- `id` - Primary key
- `user_id` - Foreign key to users
- `level` - Quiz level (1-4)
- `score` - Percentage score
- `completed_at` - Completion timestamp

### user_answers
- `id` - Primary key
- `user_id` - Foreign key to users
- `level` - Quiz level
- `question_index` - Question number
- `selected_answer` - User's answer
- `is_correct` - Boolean
- `answered_at` - Answer timestamp

## API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/login` - User login

### Progress
- `GET /api/progress/:userId` - Get user's quiz progress
- `POST /api/complete-level` - Save completed level score
- `POST /api/save-answer` - Save individual answer
- `GET /api/stats/:userId` - Get user statistics

## Deployment Options

### Option 1: Deploy to Heroku (Free Tier)

1. Install Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-ml-quiz-app
   ```
3. Add Procfile:
   ```
   web: node server.js
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js and deploy

### Option 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy!

### Option 4: Deploy to DigitalOcean App Platform

1. Go to [digitalocean.com](https://www.digitalocean.com/products/app-platform)
2. Create a new app from your GitHub repo
3. Configure build settings
4. Deploy

### Option 5: VPS Deployment (AWS, DigitalOcean Droplet, etc.)

1. SSH into your server
2. Install Node.js and npm
3. Clone your repository
4. Run `npm install`
5. Use PM2 to keep the app running:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

## Environment Variables

For production, set the following:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Set to 'production'

## File Structure

```
ml-quiz-app/
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── quiz.db            # SQLite database (auto-created)
├── public/
│   ├── index.html     # Main HTML file
│   ├── app.js         # Frontend JavaScript
│   └── quiz-data.js   # Quiz questions data
└── README.md          # This file
```

## Customization

### Adding More Questions

Edit `public/quiz-data.js` and add questions to the appropriate level:

```javascript
{
    question: "Your question here?",
    options: [
        "Option 1",
        "Option 2", 
        "Option 3",
        "Option 4"
    ],
    correct: 2  // Index of correct answer (0-3)
}
```

### Changing Styling

All styles are in `public/index.html` in the `<style>` section.

### Adding More Levels

1. Add level data to `public/quiz-data.js`
2. Update the level rendering in `public/app.js`
3. Update the stats display to reflect new level count

## Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- SQL injection protection via parameterized queries
- CORS is enabled - configure for production
- Consider adding rate limiting for production
- Use HTTPS in production

## Troubleshooting

**Database errors?**
- Delete `quiz.db` and restart - it will recreate automatically

**Can't connect to server?**
- Check if port 3000 is available
- Make sure all dependencies are installed

**Login not working?**
- Clear browser cache and session storage
- Check browser console for errors

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
