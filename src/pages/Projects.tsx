import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  Factory, 
  Ship, 
  Home, 
  Wrench,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Eye
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image_url?: string;
  tags: string[];
  client_name?: string;
  completion_date?: string;
  project_duration?: string;
  technologies: string[];
  results: string[];
  featured: boolean;
  created_at: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const projectCategories = ['all', 'industrial', 'infrastructure', 'commercial', 'marine', 'residential'];
  const categoryNames = ['Tất cả', 'Công nghiệp', 'Hạ tầng', 'Thương mại', 'Hàng hải', 'Dân dụng'];
  
  const categoryLabels: Record<string, string> = {
    'industrial': 'Công nghiệp',
    'infrastructure': 'Hạ tầng', 
    'commercial': 'Thương mại',
    'marine': 'Hàng hải',
    'residential': 'Dân dụng'
  };

  const stats = [
    { icon: Award, number: "500+", label: "Dự án hoàn thành" },
    { icon: Building2, number: "200+", label: "Khách hàng doanh nghiệp" },
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
          
          <div className="grid gap-8 lg:gap-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Đang tải dự án...</p>
              </div>
            ) : featuredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chưa có dự án nổi bật.</p>
              </div>
            ) : (
              featuredProjects.map((project) => (
                <div key={project.id} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-4">
                        {categoryLabels[project.category] || project.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {project.client_name && (
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Khách hàng:</span>
                          <span className="font-medium">{project.client_name}</span>
                        </div>
                      )}
                      {project.project_duration && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Thời gian:</span>
                          <span className="font-medium">{project.project_duration}</span>
                        </div>
                      )}
                    </div>

                    {project.results && project.results.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Kết quả đạt được:</h4>
                        <ul className="space-y-1">
                          {project.results.slice(0, 3).map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="group"
                    >
                      Xem chi tiết
                      <Eye className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-80 object-cover rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-80 bg-muted rounded-xl flex items-center justify-center">
                        <Factory className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
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
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map((category, index) => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {categoryNames[index]}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Đang tải dự án...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Không tìm thấy dự án nào trong danh mục này.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                  <div className="relative">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                        <Factory className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
                    >
                      {categoryLabels[project.category] || project.category}
                    </Badge>
                    {project.featured && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        Nổi bật
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {project.client_name || 'Dự án công ty'}
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
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
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/contact')}
              >
                Thảo luận dự án
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/booking')}
              >
                Đặt lịch tư vấn
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;