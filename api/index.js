const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false // Allow static frontend to load inline assets & fonts
}));

// CORS
const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',')
  : (isProd ? ['*'] : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000']);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10kb' }));

// Helper to resolve resume data
function getResumeData() {
  const possiblePaths = [
    path.join(process.cwd(), 'resume', 'resume-data.json'),
    path.join(__dirname, '..', 'resume', 'resume-data.json'),
    path.join(__dirname, 'resume-data.json')
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch {
      // Continue to next path
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

// Health check (supports /api, /api/health, /health)
app.get(['/api', '/api/health', '/health'], (req, res) => {
  res.json({
    status: 'OK',
    environment: isProd ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

// Raw resume data (supports /api/resume/raw, /resume/raw)
app.get(['/api/resume/raw', '/resume/raw'], (req, res) => {
  const data = getResumeData();
  if (data) {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } else {
    res.status(404).json({ error: 'Resume data not found' });
  }
});

// Projects list (supports /api/projects, /projects)
app.get(['/api/projects', '/projects'], async (req, res) => {
  try {
    const data = getResumeData();
    if (data && Array.isArray(data.projects)) {
      return res.json(data.projects);
    }
    res.json([]);
  } catch (err) {
    console.error('[API Error /api/projects]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// Contact submission with validation & XSS sanitization (supports /api/contact, /contact)
app.post(['/api/contact', '/contact'], async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields (name, email, message).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address format.' });
    }

    if (name.length > 100 || email.length > 150 || message.length > 2000) {
      return res.status(400).json({ error: 'Input exceeds maximum allowed length.' });
    }

    // Basic XSS mitigation
    const sanitize = (str) => String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeName = sanitize(name.trim());
    const safeEmail = sanitize(email.trim());
    const safeMessage = sanitize(message.trim());

    // In serverless / production without persistent SQLite, log securely to stdout
    console.log(`[Contact Received] From: ${safeName} <${safeEmail}> (Length: ${safeMessage.length} chars)`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.'
    });
  } catch (err) {
    console.error('[API Error /api/contact]:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

// Global 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err.message);
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

// Export for Vercel Serverless Function runtime
module.exports = app;

// Run standalone if executed directly (e.g. node api/index.js)
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}
