import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { itemsApi } from '../lib/api';

export function FeaturedProducts() {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => itemsApi.getAll(),
  });

  // Take first 8 products as featured
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of trending products that customers love
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/products')}
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products available at the moment.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
