import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Target, Eye, Heart, Lightbulb } from "lucide-react";
import teamExpertise from "@/assets/team-expertise.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Chất lượng",
      description: "Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất"
    },
    {
      icon: Users,
      title: "Khách hàng là trung tâm",
      description: "Đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu"
    },
    {
      icon: Lightbulb,
      title: "Đổi mới sáng tạo",
      description: "Không ngừng cải tiến và ứng dụng công nghệ mới"
    },
    {
      icon: Heart,
      title: "Trách nhiệm xã hội",
      description: "Bảo vệ môi trường và phát triển bền vững"
    }
  ];

  const milestones = [
    { year: "2009", event: "Thành lập công ty Sơn Hải Thịnh" },
    { year: "2012", event: "Triển khai dây chuyền sơn tĩnh điện đầu tiên" },
    { year: "2015", event: "Mở rộng quy mô, nâng cao công suất" },
    { year: "2018", event: "Đạt chứng nhận ISO 9001:2015" },
    { year: "2021", event: "Ứng dụng công nghệ tự động hóa Industry 4.0" },
    { year: "2024", event: "Trở thành đối tác chiến lược của các tập đoàn lớn" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Về <span className="text-accent">Sơn Hải Thịnh</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Với hơn 15 năm kinh nghiệm trong lĩnh vực sơn tĩnh điện, 
              chúng tôi tự hào là đối tác tin cậy của hàng trăm doanh nghiệp 
              trong và ngoài nước.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Câu chuyện của chúng tôi</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sơn Hải Thịnh được thành lập vào năm 2009 với mục tiêu mang đến 
                  những giải pháp sơn tĩnh điện chất lượng cao cho thị trường Việt Nam.
                </p>
                <p>
                  Từ một xưởng nhỏ với vài nhân viên, chúng tôi đã phát triển thành 
                  một trong những công ty hàng đầu về sơn tĩnh điện với đầy đủ 
                  dây chuyền hiện đại và đội ngũ kỹ thuật chuyên nghiệp.
                </p>
                <p>
                  Ngày hôm nay, với hơn 500 dự án đã hoàn thành thành công, 
                  chúng tôi tiếp tục cam kết mang đến những sản phẩm và dịch vụ 
                  tốt nhất cho khách hàng.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="industrial" size="lg">
                  <Link to="/projects">Xem dự án đã thực hiện</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src={teamExpertise} 
                alt="Đội ngũ chuyên gia Sơn Hải Thịnh" 
                className="rounded-xl shadow-industrial w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-industrial">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Sứ mệnh</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-center">
                  Mang đến những giải pháp sơn tĩnh điện tiên tiến nhất, 
                  giúp khách hàng nâng cao chất lượng sản phẩm, 
                  tối ưu hóa quy trình sản xuất và phát triển bền vững.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-industrial">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Tầm nhìn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-center">
                  Trở thành công ty hàng đầu Đông Nam Á về sơn tĩnh điện, 
                  được khách hàng tin tưởng bởi chất lượng vượt trội 
                  và dịch vụ chuyên nghiệp.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Giá trị cốt lõi</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Những giá trị này định hướng mọi hoạt động của chúng tôi 
              và tạo nên sự khác biệt trong dịch vụ
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Lịch sử phát triển</h2>
            <p className="text-xl text-muted-foreground">
              Hành trình 15 năm xây dựng và phát triển của Sơn Hải Thịnh
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-accent"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="text-accent text-xl">{milestone.year}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">
              Trở thành đối tác của chúng tôi
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Cùng Sơn Hải Thịnh xây dựng những dự án thành công 
              và phát triển bền vững trong tương lai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Liên hệ hợp tác</Link>
              </Button>
              <Button variant="hero" size="lg" className="bg-accent hover:bg-accent-dark">
                <Link to="/services">Xem dịch vụ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;