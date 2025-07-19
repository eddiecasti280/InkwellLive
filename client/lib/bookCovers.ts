// Book cover utilities for Inkwell
// Provides sample book covers using Unsplash API and fallbacks

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Optional - can work without it
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Fallback book cover patterns (using DiceBear-like approach)
const BOOK_COVER_PATTERNS = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop', // Books on shelf
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop', // Open book
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', // Library
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', // Reading
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop', // Bookstore
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop', // Writing
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=600&fit=crop', // Notebook
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop', // Coffee and book
];

// Book cover themes for different story types
const BOOK_COVER_THEMES = {
  fantasy: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop', // Forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', // Mountains
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop', // Magic forest
  ],
  mystery: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&sat=-50', // Dark forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&sat=-50', // Dark mountains
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&sat=-50', // Dark magic
  ],
  romance: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&sat=50', // Warm forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&sat=50', // Warm mountains
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&sat=50', // Warm magic
  ],
  scifi: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&hue=200', // Blue forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&hue=200', // Blue mountains
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&hue=200', // Blue magic
  ],
  default: BOOK_COVER_PATTERNS
};

// Generate a book cover URL based on story title and content
export function generateBookCover(storyTitle: string, storyContent?: string, theme?: string): string {
  // Use story title to generate a consistent cover for the same story
  const titleHash = storyTitle.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);
  
  // Get theme-specific covers or default
  const themeCovers = BOOK_COVER_THEMES[theme as keyof typeof BOOK_COVER_THEMES] || BOOK_COVER_THEMES.default;
  
  // Select cover based on title hash
  const coverIndex = Math.abs(titleHash) % themeCovers.length;
  
  return themeCovers[coverIndex];
}

// Generate a book cover with overlay text (for advanced usage)
export function generateBookCoverWithText(storyTitle: string, authorName?: string, theme?: string): string {
  const baseCover = generateBookCover(storyTitle, undefined, theme);
  
  // For now, return the base cover
  // In the future, we could add text overlay using Canvas API
  return baseCover;
}

// Get a random book cover (for testing)
export function getRandomBookCover(): string {
  const allCovers = Object.values(BOOK_COVER_THEMES).flat();
  return allCovers[Math.floor(Math.random() * allCovers.length)];
}

// Get covers by theme
export function getBookCoversByTheme(theme: string): string[] {
  return BOOK_COVER_THEMES[theme as keyof typeof BOOK_COVER_THEMES] || BOOK_COVER_THEMES.default;
}

// Available themes
export const AVAILABLE_THEMES = Object.keys(BOOK_COVER_THEMES);

// Book cover component props interface
export interface BookCoverProps {
  title: string;
  content?: string;
  theme?: string;
  className?: string;
  showOverlay?: boolean;
  authorName?: string;
} 