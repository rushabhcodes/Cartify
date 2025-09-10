import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  Package, 
  Mail,
  MapPin, 
  Github,
  Linkedin,
  ExternalLink
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Cartify</span>
            </Link>
            <p className="text-muted-foreground">
              Your one-stop destination for amazing products at unbeatable prices. 
              Shop with confidence and enjoy fast, secure delivery.
            </p>
          </div>

          {/* About Developer */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">About Developer</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-primary">Rushabh Patil</h5>
                <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Building web and mobile products with Next.js and Flutter, 
                focusing on clean design and efficient systems.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:mail@rushabh.dev" 
                  className="hover:text-foreground transition-colors"
                >
                  mail@rushabh.dev
                </a>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a 
                  href="https://linkedin.com/in/rushabh-patil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a 
                  href="https://github.com/rushabhcodes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a 
                  href="https://rushabh.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Portfolio Website"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/products" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                All Products
              </Link>
              <Link 
                to="/categories" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link 
                to="/deals" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Deals & Offers
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Customer Service</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/help" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </Link>
              <Link 
                to="/shipping" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Shipping Info
              </Link>
              <Link 
                to="/returns" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Returns & Exchanges
              </Link>
              <Link 
                to="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Cartify. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by{' '}
              <a 
                href="https://rushabh.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Rushabh Patil
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
