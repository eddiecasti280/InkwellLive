# User Profile Feature Setup Guide

This guide will help you set up the comprehensive user profile feature for Inkwell.

## 🗄️ Database Setup

### 1. Run the SQL Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database/profiles.sql`
4. Click **Run** to execute the SQL

This will create:
- `profiles` table with user information
- Row Level Security (RLS) policies
- Automatic profile creation trigger
- Avatar storage bucket and policies

### 2. Verify the Setup

After running the SQL, you should see:
- A new `profiles` table in your database
- Storage bucket named `avatars`
- RLS policies for secure access

## 🎨 Features Included

### Profile Management
- **Personal Information**: Full name, username, bio, location, website
- **Avatar Upload**: Profile picture with automatic storage
- **Real-time Updates**: Changes save immediately
- **Responsive Design**: Works on all devices

### User Statistics
- **Writing Analytics**: Total stories, words, monthly progress
- **Achievement Tracking**: Longest story, average words per story
- **Member Duration**: Days since joining

### Security Features
- **Row Level Security**: Users can only access their own data
- **Secure File Upload**: Avatar images stored securely
- **Input Validation**: Form validation and error handling

## 🚀 Usage

### Accessing the Profile
1. Sign in to your account
2. Click on your avatar in the top-right corner
3. Select "Profile" from the dropdown menu

### Editing Your Profile
1. Click the "Edit Profile" button
2. Update your information
3. Click "Save Changes" to update
4. Upload a new avatar by clicking the camera icon

### Profile Features
- **Avatar**: Click the camera icon to upload a new profile picture
- **Bio**: Add a personal description
- **Location**: Share where you're from
- **Website**: Link to your personal website or social media
- **Statistics**: View your writing progress and achievements

## 🔧 Customization

### Adding New Fields
To add new profile fields:

1. **Database**: Add columns to the `profiles` table
2. **Frontend**: Update the Profile component form
3. **Types**: Update the `UserProfile` interface

### Custom Statistics
To add custom statistics:

1. **Database**: Create views or functions for complex queries
2. **Frontend**: Update the `loadStats` function in Profile.tsx
3. **UI**: Add new stat cards to the statistics section

### Styling
The profile page uses Tailwind CSS classes and can be customized:
- Colors: Update the CSS variables in `global.css`
- Layout: Modify the grid structure in Profile.tsx
- Animations: Adjust Framer Motion transitions

## 🐛 Troubleshooting

### Common Issues

**Profile not loading:**
- Check if the `profiles` table exists
- Verify RLS policies are enabled
- Check browser console for errors

**Avatar upload fails:**
- Ensure the `avatars` storage bucket exists
- Check storage policies are correct
- Verify file size and format

**Statistics not showing:**
- The current implementation uses mock data
- Replace with real database queries for production

### Database Queries

To manually check profile data:
```sql
SELECT * FROM profiles WHERE id = 'your-user-id';
```

To check storage buckets:
```sql
SELECT * FROM storage.buckets WHERE id = 'avatars';
```

## 📱 Mobile Responsiveness

The profile page is fully responsive:
- **Desktop**: 3-column layout with sidebar
- **Tablet**: 2-column layout
- **Mobile**: Single column with stacked cards

## 🔒 Security Considerations

- All profile data is protected by Row Level Security
- Users can only access and modify their own profiles
- Avatar uploads are restricted to authenticated users
- File uploads are validated for type and size

## 🎯 Next Steps

Consider adding these features:
- **Profile Privacy Settings**: Control who can see your profile
- **Social Features**: Follow other writers, share achievements
- **Writing Goals**: Set and track writing targets
- **Export Data**: Download profile and writing data
- **Profile Themes**: Customize profile appearance

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify the database schema is correct
3. Test with a fresh user account
4. Check Supabase logs for backend errors 