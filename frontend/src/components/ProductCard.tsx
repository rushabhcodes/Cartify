import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useAuthStore, useCartStore } from '../store';
import { cartApi } from '../lib/api';
import type { Item } from '../types';
import { cn } from '../lib/utils';

interface ProductCardProps {
  item: Item;
  className?: string;
}

export function ProductCard({ item, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { addToLocalCart } = useCartStore();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (data: { itemId: number; quantity: number }) => cartApi.addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        await addToCartMutation.mutateAsync({ itemId: item.id, quantity: 1 });
      } else {
        addToLocalCart(item.id, 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300 overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          
          {/* Wishlist button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Category badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 capitalize"
          >
            {item.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 space-y-3">
        <div className="w-full space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {item.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(item.price)}
              </div>
              
              {/* Rating - placeholder for future */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  (4.5)
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isLoading || addToCartMutation.isPending}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading || addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
