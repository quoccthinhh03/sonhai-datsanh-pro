import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Cog, 
  Shield, 
  Users, 
  Wrench, 
  CheckCircle, 
  ArrowRight,
  Factory,
  Paintbrush,
  Settings
} from "lucide-react";
import coatingProcess from "@/assets/coating-process.jpg";

const Services = () => {
  const mainServices = [
    {
      icon: Cog,
      title: "Tư vấn thiết kế dây chuyền sơn",
      description: "Thiết kế và tư vấn hệ thống sơn tĩnh điện tối ưu cho từng loại sản phẩm và quy mô sản xuất",
      image: coatingProcess,
      features: [
        "Khảo sát và phân tích hiện trạng",
        "Thiết kế 3D chi tiết hệ thống",
        "Tối ưu hóa quy trình sản xuất",
        "Tính toán công suất và hiệu quả",
        "Hỗ trợ triển khai và vận hành"
      ],
      pricing: "Từ 50.000.000 VNĐ"
    },
    {
      icon: Shield,
      title: "Gia công sơn tĩnh điện",
      description: "Dịch vụ gia công sơn tĩnh điện chất lượng cao với công nghệ tiên tiến và đội ngũ kỹ thuật chuyên nghiệp",
      image: coatingProcess,
      features: [
        "Xử lý bề mặt chuyên nghiệp",
        "Sơn tĩnh điện chất lượng cao",
        "Kiểm tra chất lượng nghiêm ngặt",
        "Đa dạng màu sắc và độ dày",
        "Bảo hành lên đến 10 năm"
      ],
      pricing: "Từ 25.000 VNĐ/m²"
    },
    {
      icon: Users,
      title: "Hệ thống tự động hóa",
      description: "Triển khai hệ thống sơn tự động hoàn toàn, giảm thiểu sai sót và tăng năng suất",
      image: coatingProcess,
      features: [
        "Hệ thống PLC điều khiển",
        "Robot sơn tự động",
        "Hệ thống thu hồi bột sơn",
        "Giám sát và báo cáo real-time",
        "Đào tạo vận hành"
      ],
      pricing: "Từ 500.000.000 VNĐ"
    }
  ];

  const additionalServices = [
    {
      icon: Wrench,
      title: "Bảo trì và sửa chữa",
      description: "Dịch vụ bảo trì định kỳ và sửa chữa thiết bị sơn tĩnh điện"
    },
    {
      icon: Factory,
      title: "Cung cấp thiết bị",
      description: "Phân phối thiết bị sơn tĩnh điện chính hãng từ các thương hiệu uy tín"
    },
    {
      icon: Settings,
      title: "Nâng cấp hệ thống",
      description: "Nâng cấp và cải tiến hệ thống sơn hiện có"
    },
    {
      icon: Paintbrush,
      title: "Tư vấn màu sắc",
      description: "Tư vấn và phối màu chuyên nghiệp theo yêu cầu"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tư vấn & Khảo sát",
      description: "Tư vấn miễn phí và khảo sát thực tế tại hiện trường"
    },
    {
      step: "02", 
      title: "Thiết kế & Báo giá",
      description: "Thiết kế giải pháp tối ưu và báo giá chi tiết"
    },
    {
      step: "03",
      title: "Ký hợp đồng",
      description: "Thỏa thuận điều khoản và ký kết hợp đồng"
    },
    {
      step: "04",
      title: "Triển khai",
      description: "Thi công lắp đặt theo đúng tiến độ cam kết"
    },
    {
      step: "05",
      title: "Nghiệm thu & Bàn giao",
      description: "Kiểm tra chất lượng và bàn giao hệ thống"
    },
    {
      step: "06",
      title: "Hỗ trợ vận hành",
      description: "Đào tạo và hỗ trợ vận hành thiết bị"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Dịch vụ <span className="text-accent">chuyên nghiệp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Giải pháp toàn diện về sơn tĩnh điện từ tư vấn thiết kế 
            đến triển khai và bảo trì hệ thống
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-primary">{service.title}</h2>
                      <p className="text-accent font-semibold">{service.pricing}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="industrial" size="lg">
                      <Link to="/booking">Đặt lịch tư vấn</Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      <Link to="/contact">Liên hệ báo giá</Link>
                    </Button>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-xl shadow-industrial w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Dịch vụ bổ sung</h2>
            <p className="text-xl text-muted-foreground">
              Các dịch vụ hỗ trợ khác để đảm bảo hệ thống hoạt động tối ưu
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Quy trình làm việc</h2>
            <p className="text-xl text-muted-foreground">
              6 bước để đảm bảo dự án thành công và chất lượng tối ưu
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-industrial transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground font-bold">{step.step}</span>
                    </div>
                    <CardTitle className="text-lg text-primary">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">
              Bắt đầu dự án của bạn ngay hôm nay
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Liên hệ với chúng tôi để nhận tư vấn miễn phí và báo giá 
              tốt nhất cho dự án sơn tĩnh điện của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Tư vấn miễn phí</Link>
              </Button>
              <Button variant="hero" size="lg" className="bg-accent hover:bg-accent-dark">
                <Link to="/booking" className="flex items-center">
                  Đặt lịch ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;