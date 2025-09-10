import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { itemsApi } from '../lib/api';

export function Categories() {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products-for-categories'],
    queryFn: () => itemsApi.getAll(),
  });

  // Group products by category and count them
  const categories = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        count: 0,
        products: []
      };
    }
    acc[category].count++;
    acc[category].products.push(product);
    return acc;
  }, {} as Record<string, { name: string; count: number; products: typeof products }>);

  const categoryList = Object.values(categories);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  // Predefined category colors and icons for better visual appeal
  const categoryStyles = [
    { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300' },
    { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300' },
    { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300' },
    { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300' },
    { bg: 'bg-pink-100 dark:bg-pink-900/20', text: 'text-pink-700 dark:text-pink-300' },
    { bg: 'bg-indigo-100 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-300' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of products organized by categories
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square rounded-lg mb-4" />
                <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : categoryList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categoryList.map((category, index) => {
              const style = categoryStyles[index % categoryStyles.length];
              return (
                <Card
                  key={category.name}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`h-16 w-16 rounded-full ${style.bg} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <ShoppingBag className={`h-8 w-8 ${style.text}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg capitalize">
                        {category.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} {category.count === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
