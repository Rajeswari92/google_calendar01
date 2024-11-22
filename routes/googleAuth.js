const express = require('express');
const { google } = require('googleapis');
const Token = require('../models/Token');
const router = express.Router();

// Google OAuth setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Handle Google OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Code not provided');

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const tokenData = new Token({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    userId: tokens.id_token
  });

  await tokenData.save();

  res.json({ message: 'Token saved successfully' });
});

// Route to fetch user events
router.get('/events', async (req, res) => {
  const token = await Token.findOne({ userId: req.query.userId });
  if (!token) return res.status(400).send('Token not found');

  oauth2Client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  calendar.events.list(
    {
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    },
    (err, response) => {
      if (err) return res.status(500).send('The API returned an error: ' + err);
      const events = response.data.items;
      res.json(events);
    }
  );
});

module.exports = router;
