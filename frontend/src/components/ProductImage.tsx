import { useImageLoad } from '../hooks/useImageLoad';

/**
 * Component for displaying product images with fallback
 */
interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function ProductImage({ src, alt, className = '', fallbackClassName = '' }: ProductImageProps) {
  const { isLoading, hasError } = useImageLoad(src);

  if (!src || hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${fallbackClassName}`}>
        <div className="text-center space-y-2">
          <svg 
            className="h-12 w-12 text-muted-foreground mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-xs text-muted-foreground">
            {hasError ? 'Image not available' : 'No image'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-muted animate-pulse flex items-center justify-center ${fallbackClassName}`}>
          <div className="text-xs text-muted-foreground">Loading...</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}
