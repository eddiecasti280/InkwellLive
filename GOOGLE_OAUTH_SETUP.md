# Google OAuth Setup Guide for Inkwell

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one

### 1.2 Enable Google+ API
- Go to "APIs & Services" → "Library"
- Search for "Google+ API" and enable it
- Also enable "Google Identity" if prompted

### 1.3 Create OAuth 2.0 Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client IDs"
- Choose "Web application" as the application type

### 1.4 Configure OAuth Consent Screen
- Set application name: "Inkwell"
- Set user support email: your email
- Set developer contact information: your email
- Add scopes: `email`, `profile`, `openid`

### 1.5 Add Authorized Redirect URIs
Add these redirect URIs to your OAuth client:

**For Production:**
```
https://gsvrkioetizbiyqcqssw.supabase.co/auth/v1/callback
```

**For Development:**
```
http://localhost:8087/auth/callback
http://localhost:3000/auth/callback
http://localhost:5173/auth/callback
```

### 1.6 Save Your Credentials
- Copy the **Client ID** and **Client Secret**
- Keep these secure - you'll need them for the next step

## Step 2: Configure Supabase

### 2.1 Go to Supabase Dashboard
- Visit [Supabase Dashboard](https://supabase.com/dashboard)
- Select your Inkwell project

### 2.2 Enable Google Provider
- Go to "Authentication" → "Providers"
- Find "Google" and click "Enable"

### 2.3 Add OAuth Credentials
- **Client ID**: Paste your Google OAuth Client ID
- **Client Secret**: Paste your Google OAuth Client Secret
- **Redirect URL**: Leave as default (Supabase handles this)

### 2.4 Save Configuration
- Click "Save" to enable Google OAuth

## Step 3: Test the Integration

### 3.1 Test in Development
1. Start your development server: `npm run dev`
2. Go to `http://localhost:8087/auth`
3. Click "Google" button
4. Complete the OAuth flow
5. You should be redirected back to your app

### 3.2 Test in Production
1. Deploy your app
2. Test the Google sign-in flow
3. Verify users are created in Supabase

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in Google Console matches exactly
   - Include both development and production URLs

2. **"OAuth consent screen not configured"**
   - Complete the OAuth consent screen setup in Google Console
   - Add your domain to authorized domains

3. **"Client ID not found"**
   - Verify the Client ID is correct in Supabase settings
   - Check that Google OAuth is enabled in Supabase

4. **"Redirect URI mismatch"**
   - Ensure the redirect URI in Supabase matches your app's domain
   - Check for trailing slashes or protocol mismatches

### Environment Variables (Optional)
If you want to use environment variables for the OAuth credentials:

```env
# .env.local
VITE_SUPABASE_URL=https://gsvrkioetizbiyqcqssw.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Security Notes

- Never commit OAuth credentials to version control
- Use environment variables in production
- Regularly rotate your OAuth client secrets
- Monitor OAuth usage in Google Cloud Console

## Next Steps

After setting up Google OAuth:

1. Test the complete authentication flow
2. Set up user profile management
3. Add protected routes
4. Implement user-specific features

Your Google OAuth integration should now be working! 🎉 