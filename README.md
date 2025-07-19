# Inkwell - Your Cozy Corner of the Writing World

A warm, welcoming writing platform designed by writers, for writers. Store, organize, and share your stories in a beautiful, supportive environment.

## ✨ Features

### 🖊️ Writing & Organization
- **Rich Text Editor**: Create beautiful stories with our integrated editor
- **Personal Dashboard**: View all your writings in one organized space
- **Story Viewer**: Read your stories in a clean, distraction-free environment
- **Word Count Tracking**: Monitor your writing progress
- **User-Specific Content**: Your stories are private and secure

### 🎨 Design & Experience
- **Warm, Cozy Aesthetic**: Carefully crafted color palette and typography
- **Responsive Design**: Works beautifully on desktop and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable writing
- **Smooth Animations**: Delightful micro-interactions throughout

### 🔐 Security & Authentication
- **Google OAuth**: Secure sign-in with your Google account
- **Row Level Security**: Your data is protected at the database level
- **User Profiles**: Personalized experience for each writer

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Quill** for rich text editing

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** database
- **Row Level Security (RLS)** for data protection
- **Supabase Auth** for authentication

### UI Components
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Custom design system** with warm, writer-friendly colors

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eddiecasti280/InkwellLive.git
   cd InkwellLive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Set up the database schema (see `database/profiles.sql`)
   - Add the `writings` table with `user_id` column
   - Configure Row Level Security policies

4. **Configure environment variables**
   - Copy your Supabase URL and anon key to `client/lib/supabaseClient.ts`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:8081`
   - Sign in with your Google account
   - Start writing!

## 📁 Project Structure

```
InkwellLive/
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and configurations
│   └── hooks/             # Custom React hooks
├── database/              # Database schema and migrations
├── public/                # Static assets
└── README.md             # This file
```

## 🎯 Core Features Walkthrough

### Creating Your First Story
1. Sign in with your Google account
2. Click "New Writing" in the navigation
3. Add a title and start writing
4. Click "Save" to store your story
5. View it in your Dashboard

### Viewing Your Stories
1. Go to your Dashboard
2. See all your stories listed with previews
3. Click the eye icon to read the full story
4. Use the edit icon to modify your work

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Database Schema
The project uses two main tables:
- `profiles` - User profile information
- `writings` - User stories and content

### Security
- Row Level Security ensures users can only access their own data
- Authentication is handled through Supabase Auth
- All database queries are protected by RLS policies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with love for the writing community
- Inspired by the cozy feeling of a favorite coffee shop
- Designed to encourage creativity and connection

---

**Happy Writing! ✍️**

*Inkwell - Where every word finds its home.* 