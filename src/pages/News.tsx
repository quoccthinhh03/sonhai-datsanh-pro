import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock,
  Tag,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-coating-facility.jpg";
import coatingProcess from "@/assets/coating-process.jpg";
import teamExpertise from "@/assets/team-expertise.jpg";

const News = () => {
  const categories = [
    "Tất cả",
    "Công nghệ",
    "Dự án",
    "Sự kiện",
    "Hướng dẫn",
    "Tin tức ngành"
  ];

  const featuredNews = {
    title: "Công nghệ sơn tĩnh điện thế hệ mới: Industry 4.0 và AI",
    excerpt: "Khám phá cách công nghệ AI và IoT đang thay đổi ngành sơn tĩnh điện, mang lại hiệu quả cao hơn và chất lượng vượt trội.",
    image: heroImage,
    category: "Công nghệ",
    date: "15/11/2024",
    author: "Kỹ sư Nguyễn Văn An",
    readTime: "5 phút đọc",
    tags: ["AI", "Industry 4.0", "Tự động hóa"]
  };

  const newsArticles = [
    {
      title: "Sơn Hải Thịnh hoàn thành dự án sơn tĩnh điện lớn nhất năm 2024",
      excerpt: "Dự án dây chuyền sơn tự động cho Honda Việt Nam chính thức đi vào hoạt động với công suất 10.000 sản phẩm/ngày.",
      image: coatingProcess,
      category: "Dự án",
      date: "10/11/2024",
      author: "Ban biên tập",
      readTime: "3 phút đọc",
      tags: ["Honda", "Dự án lớn", "Thành công"]
    },
    {
      title: "Hướng dẫn bảo trì hệ thống sơn tĩnh điện hiệu quả",
      excerpt: "Các bước bảo trì định kỳ để đảm bảo hệ thống sơn tĩnh điện hoạt động ổn định và kéo dài tuổi thọ thiết bị.",
      image: teamExpertise,
      category: "Hướng dẫn",
      date: "08/11/2024",
      author: "Kỹ sư Trần Minh Hoàng",
      readTime: "7 phút đọc",
      tags: ["Bảo trì", "Hướng dẫn", "Kỹ thuật"]
    },
    {
      title: "Triển lãm công nghiệp Việt Nam 2024: Sơn Hải Thịnh giới thiệu công nghệ mới",
      excerpt: "Tham gia triển lãm với gian hàng ấn tượng, giới thiệu robot sơn tự động và giải pháp Industry 4.0.",
      image: heroImage,
      category: "Sự kiện",
      date: "05/11/2024",
      author: "Phòng Marketing",
      readTime: "4 phút đọc",
      tags: ["Triển lãm", "Công nghệ mới", "Industry 4.0"]
    },
    {
      title: "Xu hướng sơn tĩnh điện thân thiện môi trường năm 2024",
      excerpt: "Các giải pháp sơn xanh, giảm phát thải và tái chế trong ngành sơn tĩnh điện đang trở thành xu hướng toàn cầu.",
      image: coatingProcess,
      category: "Tin tức ngành",
      date: "02/11/2024",
      author: "Chuyên gia Lê Thị Mai",
      readTime: "6 phút đọc",
      tags: ["Môi trường", "Xu hướng", "Bền vững"]
    },
    {
      title: "Bí quyết lựa chọn bột sơn tĩnh điện phù hợp",
      excerpt: "Hướng dẫn chi tiết cách chọn loại bột sơn phù hợp với từng ứng dụng và yêu cầu kỹ thuật cụ thể.",
      image: teamExpertise,
      category: "Hướng dẫn",
      date: "30/10/2024",
      author: "Kỹ sư Phạm Đức Minh",
      readTime: "5 phút đọc",
      tags: ["Bột sơn", "Lựa chọn", "Kỹ thuật"]
    },
    {
      title: "Chương trình đào tạo kỹ thuật sơn tĩnh điện Q4/2024",
      excerpt: "Mở đăng ký khóa đào tạo chuyên sâu về vận hành và bảo trì hệ thống sơn tĩnh điện cho kỹ thuật viên.",
      image: heroImage,
      category: "Sự kiện",
      date: "28/10/2024",
      author: "Phòng Đào tạo",
      readTime: "3 phút đọc",
      tags: ["Đào tạo", "Kỹ thuật", "Chương trình"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Tin tức & <span className="text-accent">Blog kỹ thuật</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về công nghệ, xu hướng 
            và kiến thức chuyên môn trong lĩnh vực sơn tĩnh điện
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="default" className="bg-accent">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Nổi bật
                </Badge>
                <Badge variant="outline">{featuredNews.category}</Badge>
              </div>
              
              <h2 className="text-4xl font-bold text-primary mb-6">{featuredNews.title}</h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {featuredNews.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>{featuredNews.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-accent" />
                  <span>{featuredNews.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{featuredNews.readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {featuredNews.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button variant="industrial" size="lg">
                Đọc bài viết
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div>
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title}
                className="rounded-xl shadow-industrial w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-6">Tất cả bài viết</h2>
            <p className="text-xl text-muted-foreground">
              Khám phá kiến thức chuyên môn và cập nhật công nghệ mới nhất
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={index === 0 ? "industrial" : "outline"} 
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <Card key={index} className="group hover:shadow-industrial transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent/90">
                    {article.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-primary group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent">
                    Đọc thêm
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">
              Đăng ký nhận tin tức mới nhất
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Nhận thông tin cập nhật về công nghệ mới, hướng dẫn kỹ thuật 
              và tin tức ngành sơn tĩnh điện qua email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Email của bạn"
                className="px-4 py-3 rounded-lg flex-1 text-foreground"
              />
              <Button variant="hero" size="lg" className="bg-accent hover:bg-accent-dark">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Chủ đề phổ biến</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Công nghệ AI",
              "Industry 4.0", 
              "Bảo trì thiết bị",
              "Tiết kiệm năng lượng",
              "Môi trường xanh",
              "Robot tự động",
              "Chất lượng sơn",
              "Quy trình sản xuất",
              "Đào tạo kỹ thuật",
              "Xu hướng ngành"
            ].map((topic, index) => (
              <Button key={index} variant="outline" size="sm" className="hover:border-accent hover:text-accent">
                <Tag className="w-3 h-3 mr-2" />
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;