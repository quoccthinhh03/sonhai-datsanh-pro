import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Facebook,
  Youtube,
  Linkedin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên").max(100, "Tên quá dài"),
  email: z.string().trim().email("Email không hợp lệ").max(255, "Email quá dài"),
  phone: z.string().trim().max(20, "Số điện thoại không hợp lệ").optional().or(z.literal("")),
  subject: z.string().trim().max(200, "Tiêu đề quá dài").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Vui lòng nhập nội dung").max(2000, "Nội dung quá dài")
});

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      
      // Prepare data for database
      const contactData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || null,
        message: validatedData.message,
        status: 'new',
        user_id: user?.id
      };
      
      // Insert into database
      const { error } = await supabase
        .from('contacts')
        .insert(contactData);
      
      if (error) {
        console.error('Database error:', error);
        throw new Error('Lỗi lưu dữ liệu');
      }
      
      toast({
        title: "Gửi thông tin thành công!",
        description: "Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error('Contact submission error:', error);
      
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        toast({
          title: "Thông tin không hợp lệ",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Có lỗi xảy ra",
          description: "Vui lòng thử lại sau hoặc liên hệ hotline để được hỗ trợ.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      details: ["0123 456 789", "0987 654 321"],
      description: "Hotline 24/7"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@sonhaithinhpaint.com", "sales@sonhaithinhpaint.com"],
      description: "Phản hồi trong 24h"
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      details: ["123 Đường ABC, Quận XYZ", "TP. Hồ Chí Minh, Việt Nam"],
      description: "Văn phòng & Xưởng"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      details: ["T2-T6: 8:00 - 17:00", "T7: 8:00 - 12:00"],
      description: "Chủ nhật nghỉ"
    }
  ];

  const offices = [
    {
      name: "Văn phòng chính - TP.HCM",
      address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
      phone: "0123 456 789",
      email: "hcm@sonhaithinhpaint.com"
    },
    {
      name: "Chi nhánh Hà Nội",
      address: "456 Đường DEF, Quận GHI, Hà Nội",
      phone: "0987 654 321", 
      email: "hn@sonhaithinhpaint.com"
    },
    {
      name: "Chi nhánh Đà Nẵng",
      address: "789 Đường JKL, Quận MNO, Đà Nẵng",
      phone: "0369 258 147",
      email: "dn@sonhaithinhpaint.com"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Liên hệ <span className="text-accent">với chúng tôi</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
            Hãy liên hệ để được tư vấn tốt nhất!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="shadow-industrial">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <MessageSquare className="mr-3 h-6 w-6 text-accent" />
                    Gửi tin nhắn
                  </CardTitle>
                  <CardDescription>
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn sớm nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Nguyễn Văn A"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="0123 456 789"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Tiêu đề</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Tư vấn dịch vụ sơn tĩnh điện"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Nội dung *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Mô tả chi tiết nhu cầu và câu hỏi của bạn..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="industrial" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-foreground">{detail}</p>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Kết nối với chúng tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center hover:shadow-glow transition-all"
                    >
                      <Facebook className="h-6 w-6 text-accent-foreground" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center hover:shadow-glow transition-all"
                    >
                      <Youtube className="h-6 w-6 text-accent-foreground" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center hover:shadow-glow transition-all"
                    >
                      <Linkedin className="h-6 w-6 text-accent-foreground" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-industrial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Văn phòng & Chi nhánh</h2>
            <p className="text-xl text-muted-foreground">
              Hệ thống văn phòng trên toàn quốc để phục vụ bạn tốt nhất
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="shadow-card hover:shadow-industrial transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{office.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <p className="text-sm">{office.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-accent" />
                    <p className="text-sm">{office.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-6">Tìm đường đến văn phòng</h2>
          </div>
          
          <Card className="shadow-industrial">
            <CardContent className="p-0">
              <div className="bg-gradient-industrial h-96 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Bản đồ văn phòng</h3>
                  <p className="text-muted-foreground">
                    123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;