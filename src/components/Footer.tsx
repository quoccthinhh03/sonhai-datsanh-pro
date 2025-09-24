import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Sơn Hải Thịnh</h2>
                <p className="text-xs opacity-80">Electrostatic Coating</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Chuyên cung cấp dịch vụ gia công sơn tĩnh điện chất lượng cao với công nghệ hiện đại nhất.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dịch vụ</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/services" className="hover:text-accent transition-colors">Tư vấn thiết kế dây chuyền sơn</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Gia công sơn tĩnh điện</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Hệ thống tự động hóa</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Bảo trì và sửa chữa</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/about" className="hover:text-accent transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Dự án đã thực hiện</Link></li>
              <li><Link to="/news" className="hover:text-accent transition-colors">Tin tức</Link></li>
              <li><Link to="/booking" className="hover:text-accent transition-colors">Đặt lịch gia công</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>info@sonhaithinhpaint.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                <span>T2-T6: 8:00-17:00, T7: 8:00-12:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light/20 mt-8 pt-6 text-center text-sm opacity-80">
          <p>&copy; 2024 Sơn Hải Thịnh. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;