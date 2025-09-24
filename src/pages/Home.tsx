import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Cog, Users, Award, Phone, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-coating-facility.jpg";
import coatingProcess from "@/assets/coating-process.jpg";
import teamExpertise from "@/assets/team-expertise.jpg";

const Home = () => {
  const services = [
    {
      icon: Cog,
      title: "Tư vấn thiết kế dây chuyền sơn",
      description: "Thiết kế hệ thống sơn tĩnh điện tối ưu cho từng yêu cầu sản xuất",
      features: ["Khảo sát hiện trạng", "Thiết kế 3D", "Tối ưu quy trình"]
    },
    {
      icon: Shield,
      title: "Gia công sơn tĩnh điện",
      description: "Dịch vụ gia công sơn chất lượng cao với công nghệ hiện đại",
      features: ["Độ bền cao", "Màu sắc đa dạng", "Thời gian nhanh"]
    },
    {
      icon: Users,
      title: "Hệ thống tự động hóa",
      description: "Triển khai hệ thống sơn tự động, giảm thiểu sai sót",
      features: ["Tự động 100%", "Tiết kiệm nhân lực", "Chất lượng ổn định"]
    }
  ];

  const stats = [
    { number: "500+", label: "Dự án hoàn thành" },
    { number: "15+", label: "Năm kinh nghiệm" },
    { number: "100%", label: "Khách hàng hài lòng" },
    { number: "24/7", label: "Hỗ trợ kỹ thuật" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Chuyên gia <span className="text-accent">Sơn Tĩnh Điện</span>
              <br />
              Hàng đầu Việt Nam
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Cung cấp giải pháp toàn diện về sơn tĩnh điện với công nghệ tiên tiến, 
              chất lượng vượt trội và dịch vụ chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Link to="/booking" className="flex items-center">
                  Đặt lịch tư vấn
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/services" className="flex items-center">
                  Tìm hiểu dịch vụ
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Dịch vụ chuyên nghiệp
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp toàn diện về sơn tĩnh điện 
              từ tư vấn thiết kế đến triển khai và bảo trì
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                    <service.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent">
                      Tìm hiểu thêm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                Tại sao chọn <span className="text-accent">Sơn Hải Thịnh</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Kinh nghiệm 15+ năm</h3>
                    <p className="text-muted-foreground">Đội ngũ kỹ sư chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực sơn tĩnh điện</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Chất lượng đảm bảo</h3>
                    <p className="text-muted-foreground">Cam kết chất lượng cao với bảo hành lên đến 10 năm cho các sản phẩm</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cog className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Công nghệ hiện đại</h3>
                    <p className="text-muted-foreground">Sử dụng thiết bị và công nghệ sơn tĩnh điện tiên tiến nhất từ châu Âu</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="industrial" size="lg" className="text-lg px-8">
                  <Link to="/about">Tìm hiểu về chúng tôi</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={coatingProcess} 
                alt="Quy trình sơn tĩnh điện chuyên nghiệp" 
                className="rounded-xl shadow-card hover:shadow-industrial transition-all"
              />
              <img 
                src={teamExpertise} 
                alt="Đội ngũ chuyên gia kỹ thuật" 
                className="rounded-xl shadow-card hover:shadow-industrial transition-all mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí 
              và báo giá tốt nhất cho dự án sơn tĩnh điện của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Liên hệ tư vấn</Link>
              </Button>
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 bg-accent hover:bg-accent-dark">
                <Link to="/booking">Đặt lịch ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;