// Book cover utilities for Inkwell
// Provides sample book covers using Unsplash API and fallbacks

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Optional - can work without it
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Fallback book cover patterns (using abstract, artistic covers)
const BOOK_COVER_PATTERNS = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1200&fit=crop', // Books on shelf
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop', // Open book
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1200&fit=crop', // Bookstore
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=1200&fit=crop', // Notebook
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=1200&fit=crop', // Stack of books
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1200&fit=crop&sat=-20', // Bookstore (desaturated)
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop', // Abstract paint texture
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop', // Abstract geometric shapes
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1200&fit=crop', // Abstract color gradients
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop', // Abstract marble texture
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1200&fit=crop', // Abstract liquid art
  'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&h=1200&fit=crop', // Abstract smoke art
];

// Book cover themes for different story types
const BOOK_COVER_THEMES = {
  fantasy: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop', // Magic forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop', // Mountains
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop', // Forest
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop&sat=20&brightness=1.1', // Golden paint texture
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop&sat=30&brightness=1.2', // Golden marble
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1200&fit=crop&sat=40&brightness=1.1', // Golden liquid art
  ],
  mystery: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop&sat=-50&brightness=0.7', // Dark magic forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&sat=-50&brightness=0.7', // Dark mountains
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop&sat=-50&brightness=0.7', // Dark forest
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop&sat=-60&brightness=0.6', // Dark paint texture
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop&sat=-70&brightness=0.5', // Dark marble
    'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&h=1200&fit=crop&sat=-50&brightness=0.6', // Dark smoke art
  ],
  romance: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop&sat=30&brightness=1.1', // Warm magic forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&sat=30&brightness=1.1', // Warm mountains
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop&sat=30&brightness=1.1', // Warm forest
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop&sat=40&brightness=1.2&hue=350', // Pink paint texture
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop&sat=50&brightness=1.3&hue=340', // Pink marble
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1200&fit=crop&sat=45&brightness=1.2&hue=345', // Pink liquid art
  ],
  scifi: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop&hue=200&sat=20', // Blue magic forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&hue=200&sat=20', // Blue mountains
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop&hue=200&sat=20', // Blue forest
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop&hue=220&sat=30', // Blue geometric shapes
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1200&fit=crop&hue=210&sat=25', // Blue color gradients
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1200&fit=crop&hue=200&sat=20', // Blue liquid art
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
  
  // Add cache-busting parameter to force reload
  const baseUrl = themeCovers[coverIndex];
  const separator = baseUrl.includes('?') ? '&' : '?';
  
  return `${baseUrl}${separator}v=2`;
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
  const baseUrl = allCovers[Math.floor(Math.random() * allCovers.length)];
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}v=2`;
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