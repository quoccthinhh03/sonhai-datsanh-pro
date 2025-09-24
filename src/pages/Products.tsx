import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Shield, 
  Cog, 
  Wrench, 
  ArrowRight, 
  Star,
  Award,
  Truck
} from "lucide-react";
import coatingProcess from "@/assets/coating-process.jpg";

const Products = () => {
  const productCategories = [
    {
      title: "Thiết bị sơn tĩnh điện",
      description: "Dây chuyền sơn tĩnh điện hoàn chỉnh từ các thương hiệu hàng đầu",
      products: [
        {
          name: "Máy phun sơn tĩnh điện Wagner OptiGun A1",
          description: "Súng phun sơn tĩnh điện chuyên nghiệp với công nghệ Opticharged",
          image: coatingProcess,
          features: ["Công suất 100kV", "Hiệu suất 95%", "Tiết kiệm sơn 30%"],
          price: "Liên hệ",
          badge: "Bestseller"
        },
        {
          name: "Buồng sơn tĩnh điện tự động",
          description: "Hệ thống buồng sơn với robot tự động và thu hồi bột sơn",
          image: coatingProcess,
          features: ["Robot 6 trục", "Thu hồi 99%", "Điều khiển PLC"],
          price: "Từ 2.5 tỷ VNĐ",
          badge: "Premium"
        },
        {
          name: "Lò sấy công nghiệp",
          description: "Lò sấy tiết kiệm năng lượng với hệ thống điều khiển thông minh",
          image: coatingProcess,
          features: ["200-250°C", "Tiết kiệm 40% năng lượng", "Kiểm soát nhiệt độ chính xác"],
          price: "Từ 800 triệu VNĐ",
          badge: "Eco-friendly"
        }
      ]
    },
    {
      title: "Phụ kiện & Linh kiện",
      description: "Các phụ kiện và linh kiện thay thế chính hãng",
      products: [
        {
          name: "Bộ súng phun sơn thay thế",
          description: "Bộ súng phun sơn chính hãng với đầu phun chuyên dụng",
          image: coatingProcess,
          features: ["Chống mài mòn", "Dễ vệ sinh", "Tuổi thọ cao"],
          price: "Từ 5 triệu VNĐ",
          badge: "Original"
        },
        {
          name: "Hệ thống thu hồi bột sơn",
          description: "Cyclone thu hồi bột sơn hiệu suất cao",
          image: coatingProcess,
          features: ["Hiệu suất 99%", "Bảo trì ít", "Vận hành êm"],
          price: "Từ 200 triệu VNĐ",
          badge: "High-efficiency"
        },
        {
          name: "Bộ lọc không khí chuyên dụng",
          description: "Hệ thống lọc không khí đa tầng cho môi trường sạch",
          image: coatingProcess,
          features: ["Lọc 99.9%", "Thay thế dễ dàng", "Tuốt thọ 12 tháng"],
          price: "Từ 20 triệu VNĐ",
          badge: "Clean Tech"
        }
      ]
    }
  ];

  const services = [
    {
      icon: Truck,
      title: "Giao hàng toàn quốc",
      description: "Miễn phí giao hàng và lắp đặt"
    },
    {
      icon: Award,
      title: "Bảo hành chính hãng",
      description: "Bảo hành 1-5 năm tùy sản phẩm"
    },
    {
      icon: Wrench,
      title: "Hỗ trợ kỹ thuật",
      description: "Đội ngũ kỹ thuật 24/7"
    },
    {
      icon: Star,
      title: "Chất lượng đảm bảo",
      description: "Sản phẩm chính hãng 100%"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "default";
      case "Premium": return "secondary";
      case "Eco-friendly": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Sản phẩm <span className="text-accent">chất lượng cao</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thiết bị sơn tĩnh điện và phụ kiện chính hãng từ các thương hiệu 
            hàng đầu thế giới
          </p>
        </div>
      </section>

      {/* Product Categories */}
      {productCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-gradient-industrial' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">{category.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {category.products.map((product, index) => (
                <Card key={index} className="group hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-4 right-4 ${getBadgeVariant(product.badge)}`}
                    >
                      {product.badge}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-accent">{product.price}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="industrial" className="flex-1">
                        <Link to="/contact">Liên hệ báo giá</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="group-hover:border-accent group-hover:text-accent">
                        Chi tiết
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Services Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Dịch vụ hỗ trợ toàn diện
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Chúng tôi không chỉ cung cấp sản phẩm mà còn đồng hành 
              cùng bạn trong suốt quá trình sử dụng
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center bg-white/10 border-white/20 hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-foreground/80">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Cần tư vấn sản phẩm phù hợp?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Đội ngũ chuyên gia của chúng tôi sẽ giúp bạn lựa chọn 
              thiết bị phù hợp nhất với nhu cầu và ngân sách.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="industrial" size="lg">
                <Link to="/contact">Tư vấn miễn phí</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/booking">Đặt lịch khảo sát</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;