import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Award,
  ArrowRight,
  Building,
  Factory,
  Truck
} from "lucide-react";
import heroImage from "@/assets/hero-coating-facility.jpg";
import coatingProcess from "@/assets/coating-process.jpg";
import teamExpertise from "@/assets/team-expertise.jpg";

const Projects = () => {
  const projectCategories = [
    "Tất cả",
    "Ô tô & Xe máy", 
    "Điện tử & Điện lạnh",
    "Nội thất & Trang trí",
    "Công nghiệp nặng",
    "Thiết bị y tế"
  ];

  const featuredProjects = [
    {
      title: "Dây chuyền sơn tĩnh điện Honda Việt Nam",
      category: "Ô tô & Xe máy",
      client: "Honda Việt Nam Co., Ltd",
      location: "Hưng Yên",
      duration: "6 tháng",
      year: "2024",
      image: heroImage,
      description: "Thiết kế và lắp đặt hệ thống sơn tĩnh điện tự động hoàn toàn cho linh kiện xe máy Honda với công suất 10.000 sản phẩm/ngày.",
      results: [
        "Tăng 40% năng suất sản xuất",
        "Giảm 35% chi phí sơn",
        "Nâng cao chất lượng sản phẩm",
        "Đạt tiêu chuẩn ISO 14001"
      ],
      tags: ["Tự động hóa", "Quy mô lớn", "Tiết kiệm năng lượng"]
    },
    {
      title: "Hệ thống sơn linh kiện điện tử Samsung",
      category: "Điện tử & Điện lạnh", 
      client: "Samsung Electronics Vietnam",
      location: "Bắc Ninh",
      duration: "4 tháng",
      year: "2023",
      image: coatingProcess,
      description: "Triển khai giải pháp sơn tĩnh điện cho vỏ tivi và thiết bị điện tử với yêu cầu chất lượng cao và màu sắc đa dạng.",
      results: [
        "15 màu sắc chuẩn quốc tế",
        "Độ bám dính 98%",
        "Không có khiếm khuyết sơn",
        "Tiết kiệm 30% nguyên liệu"
      ],
      tags: ["Chất lượng cao", "Đa màu sắc", "Không khiếm khuyết"]
    },
    {
      title: "Nâng cấp hệ thống sơn Thành Công Group",
      category: "Ô tô & Xe máy",
      client: "Thành Công Group",
      location: "Quảng Nam", 
      duration: "3 tháng",
      year: "2023",
      image: teamExpertise,
      description: "Nâng cấp dây chuyền sơn xe tải từ hệ thống cũ sang công nghệ sơn tĩnh điện hiện đại với robot tự động.",
      results: [
        "Giảm 50% thời gian sơn",
        "Tăng độ bền màng sơn 3 lần",
        "Giảm 60% lãng phí sơn",
        "Cải thiện môi trường làm việc"
      ],
      tags: ["Nâng cấp", "Robot tự động", "Thân thiện môi trường"]
    }
  ];

  const allProjects = [
    {
      title: "Sơn khung xe đạp Giant",
      client: "Giant Manufacturing",
      category: "Ô tô & Xe máy",
      year: "2024",
      image: coatingProcess
    },
    {
      title: "Dây chuyền sơn tủ lạnh Electrolux",
      client: "Electrolux Vietnam",
      category: "Điện tử & Điện lạnh",
      year: "2023",
      image: heroImage
    },
    {
      title: "Hệ thống sơn nội thất cao cấp",
      client: "Nha Trang Furniture",
      category: "Nội thất & Trang trí",
      year: "2023",
      image: teamExpertise
    },
    {
      title: "Sơn kết cấu thép nhà máy",
      client: "Hoa Sen Group",
      category: "Công nghiệp nặng", 
      year: "2024",
      image: coatingProcess
    },
    {
      title: "Thiết bị y tế Meditech",
      client: "Meditech Vietnam",
      category: "Thiết bị y tế",
      year: "2022",
      image: heroImage
    },
    {
      title: "Linh kiện máy lạnh Daikin",
      client: "Daikin Vietnam",
      category: "Điện tử & Điện lạnh",
      year: "2023",
      image: teamExpertise
    }
  ];

  const stats = [
    { icon: Award, number: "500+", label: "Dự án hoàn thành" },
    { icon: Building, number: "200+", label: "Khách hàng doanh nghiệp" },
    { icon: Users, number: "50+", label: "Đối tác quốc tế" },
    { icon: Factory, number: "15+", label: "Năm kinh nghiệm" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Dự án <span className="text-accent">đã thực hiện</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hơn 500 dự án thành công cùng các doanh nghiệp hàng đầu trong và ngoài nước
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Dự án nổi bật</h2>
            <p className="text-xl text-muted-foreground">
              Những dự án tiêu biểu thể hiện năng lực và chất lượng của chúng tôi
            </p>
          </div>
          
          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-primary mb-4">{project.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-accent" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>{project.duration} - {project.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Factory className="h-4 w-4 text-accent" />
                      <span>{project.category}</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-semibold text-primary mb-4">Kết quả đạt được:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="industrial" size="lg">
                    <Link to="/contact">Tìm hiểu thêm</Link>
                  </Button>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="rounded-xl shadow-industrial w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Tất cả dự án</h2>
            <p className="text-xl text-muted-foreground">
              Portfolio đầy đủ các dự án đã triển khai thành công
            </p>
          </div>
          
          {/* Category Filter - Static for demo */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "industrial" : "outline"} 
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent">
                    {project.year}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="h-4 w-4 text-accent" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <Factory className="h-4 w-4 text-accent" />
                      <span>{project.category}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent">
                    Xem chi tiết
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
              Dự án tiếp theo sẽ là của bạn?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Với kinh nghiệm từ hơn 500 dự án thành công, chúng tôi sẵn sàng 
              đồng hành cùng bạn trong dự án sơn tĩnh điện tiếp theo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Thảo luận dự án</Link>
              </Button>
              <Button variant="hero" size="lg" className="bg-accent hover:bg-accent-dark">
                <Link to="/booking">Đặt lịch tư vấn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;