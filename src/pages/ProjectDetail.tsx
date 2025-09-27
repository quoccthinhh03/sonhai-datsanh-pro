import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải chi tiết dự án...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy dự án</h1>
            <p className="text-muted-foreground mb-6">Dự án bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={() => navigate('/projects')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách dự án
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    'industrial': 'Công nghiệp',
    'infrastructure': 'Hạ tầng',
    'commercial': 'Thương mại',
    'marine': 'Hàng hải',
    'residential': 'Dân dụng'
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/projects')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách dự án
          </Button>

          <div className="mb-8">
            {project.image_url && (
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Dự án nổi bật
                  </Badge>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm">
                {categoryLabels[project.category] || project.category}
              </Badge>
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <p className="text-xl text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: project.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') 
                    }}
                  />
                </CardContent>
              </Card>

              {project.results && project.results.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Kết Quả Đạt Được</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông Tin Dự Án</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.client_name && (
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Khách hàng</p>
                        <p className="font-medium">{project.client_name}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.project_duration && (
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Thời gian thực hiện</p>
                        <p className="font-medium">{project.project_duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.completion_date && (
                    <div className="flex items-center space-x-3">
                      <CalendarDays className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Ngày hoàn thành</p>
                        <p className="font-medium">
                          {format(new Date(project.completion_date), 'dd/MM/yyyy', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {project.technologies && project.technologies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Công Nghệ Sử Dụng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Bạn có dự án tương tự?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Liên hệ với chúng tôi để được tư vấn miễn phí
                    </p>
                    <Button 
                      onClick={() => navigate('/contact')}
                      className="w-full"
                    >
                      Liên hệ ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;