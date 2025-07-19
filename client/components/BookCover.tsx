import React from 'react';
import { generateBookCover, BookCoverProps } from '../lib/bookCovers';
import { cn } from '../lib/utils';

interface BookCoverComponentProps extends BookCoverProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTitle?: boolean;
  showAuthor?: boolean;
  loading?: 'lazy' | 'eager';
}

export function BookCover({
  title,
  content,
  theme,
  className,
  showOverlay = false,
  authorName,
  size = 'md',
  showTitle = false,
  showAuthor = false,
  loading = 'lazy',
  ...props
}: BookCoverComponentProps) {
  const coverUrl = generateBookCover(title, content, theme);
  
  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-32 h-48',
    xl: 'w-40 h-60'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <img
        src={coverUrl}
        alt={`Book cover for "${title}"`}
        className="w-full h-full object-cover"
        loading={loading}
        onError={(e) => {
          // Fallback to a default cover if image fails to load
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&v=2';
        }}
      />
      
      {showOverlay && (showTitle || showAuthor) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3">
          {showTitle && (
            <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
              {title}
            </h3>
          )}
          {showAuthor && authorName && (
            <p className="text-white/80 text-xs mt-1">
              by {authorName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Book cover with title overlay (simplified version)
export function BookCoverWithTitle({ title, authorName, theme, className, size = 'md' }: {
  title: string;
  authorName?: string;
  theme?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <BookCover
      title={title}
      theme={theme}
      className={className}
      size={size}
      showOverlay={true}
      showTitle={true}
      showAuthor={true}
      authorName={authorName}
    />
  );
}

// Book cover grid for displaying multiple covers
export function BookCoverGrid({ 
  stories, 
  className,
  size = 'md',
  showTitles = false 
}: {
  stories: Array<{ id: string; title: string; content?: string; theme?: string; authorName?: string }>;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTitles?: boolean;
}) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4', className)}>
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <BookCover
            title={story.title}
            content={story.content}
            theme={story.theme}
            size={size}
            showOverlay={showTitles}
            showTitle={showTitles}
            showAuthor={showTitles}
            authorName={story.authorName}
          />
          {showTitles && (
            <p className="text-xs text-center mt-2 text-warm-700 line-clamp-2">
              {story.title}
            </p>
          )}
        </div>
      ))}
    </div>
  );
} 