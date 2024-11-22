// GoogleLogin.js
import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleLogin = ({ setAccessToken }) => {
  useEffect(() => {
    const initClient = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar.events',
        }).then(() => {
          console.log('Google API initialized');
        }).catch((err) => {
          console.error('Error initializing Google API:', err);
        });
      });
    };
    initClient();
  }, []);

  const handleSignIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) {
      alert('Google API is not initialized. Refresh and try again.');
      return;
    }
    authInstance.signIn().then((googleUser) => {
      const token = googleUser.getAuthResponse().access_token;
      setAccessToken(token);
      console.log('Access Token:', token);
    }).catch((err) => console.error('Sign-In Error:', err));
  };

  return (
    <div className="google-login">
      <button onClick={handleSignIn}>
        Sign In with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
