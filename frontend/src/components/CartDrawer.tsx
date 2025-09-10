import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAuthStore, useCartStore } from '../store';
import { cartApi } from '../lib/api';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { isAuthenticated } = useAuthStore();
  const { localCart, clearLocalCart, removeFromLocalCart } = useCartStore();
  const queryClient = useQueryClient();

  const { data: serverCart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
    enabled: isAuthenticated,
  });

  const removeItemMutation = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleRemoveItem = (itemId: number) => {
    if (isAuthenticated) {
      removeItemMutation.mutate(itemId);
    } else {
      removeFromLocalCart(itemId);
    }
  };

  const handleClearCart = () => {
    if (isAuthenticated) {
      clearCartMutation.mutate();
    } else {
      clearLocalCart();
    }
  };

  const cartItems = isAuthenticated ? serverCart : [];
  const totalPrice = cartItems.reduce((total: number, item: CartItem) => 
    total + (item.item.price * item.quantity), 0
  );
  const totalItems = cartItems.reduce((total: number, item: CartItem) => 
    total + item.quantity, 0
  ) + localCart.length;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {(cartItems.length === 0 && localCart.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground text-center">
              Add some items to get started
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {/* Server Cart Items */}
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center space-x-4 py-2">
                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                      {item.item.image ? (
                        <img 
                          src={item.item.image} 
                          alt={item.item.name}
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium leading-none">{item.item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.item.category}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">${item.item.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground">x {item.quantity}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={removeItemMutation.isPending}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveItem(item.itemId)}
                        disabled={removeItemMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Local Cart Items (for non-authenticated users) */}
                {!isAuthenticated && localCart.map((item) => (
                  <div key={item.itemId} className="flex items-center space-x-4 py-2">
                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium leading-none">Item #{item.itemId}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromLocalCart(item.itemId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              {isAuthenticated && cartItems.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Separator />
                </>
              )}
              
              <div className="space-y-2">
                {totalItems > 0 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClearCart}
                    disabled={clearCartMutation.isPending}
                  >
                    Clear Cart
                  </Button>
                )}
                
                {isAuthenticated && cartItems.length > 0 ? (
                  <Button className="w-full" size="lg">
                    Checkout (${totalPrice.toFixed(2)})
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" onClick={onClose}>
                    {!isAuthenticated ? 'Sign in to Checkout' : 'Continue Shopping'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
