import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                🎉 New Collection Available
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Amazing
                <span className="text-primary block">Products</span>
                <span className="text-muted-foreground">for You</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Shop the latest trends with unbeatable prices. Fast delivery, 
                secure payments, and exceptional customer service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate('/products')}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate('/categories')}
              >
                Browse Categories
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground">100% protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* Placeholder for hero image */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ShoppingBag className="h-32 w-32 text-primary/60 mx-auto" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Your Shopping Experience
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/20 blur-xl" />
            
            {/* Floating cards */}
            <div className="absolute top-8 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Order Confirmed</p>
                  <p className="text-xs text-muted-foreground">Fast delivery</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 -right-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-medium">5.0 Rating</p>
                  <p className="text-xs text-muted-foreground">Customer reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
