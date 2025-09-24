import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Dự án", href: "/projects" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@sonhaithinhpaint.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Chuyên gia sơn tĩnh điện hàng đầu Việt Nam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Sơn Hải Thịnh</h1>
              <p className="text-xs text-muted-foreground">Electrostatic Coating</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-secondary ${
                  location.pathname === item.href
                    ? "text-primary bg-secondary"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile menu button */}
          <div className="flex items-center space-x-4">
            <Button variant="industrial" size="sm" className="hidden md:inline-flex">
              <Link to="/booking">Đặt lịch ngay</Link>
            </Button>
            
            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-secondary ${
                    location.pathname === item.href
                      ? "text-primary bg-secondary"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button variant="industrial" size="sm" className="w-full">
                  <Link to="/booking">Đặt lịch ngay</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;