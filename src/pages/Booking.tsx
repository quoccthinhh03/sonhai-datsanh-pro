import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema
const bookingSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên").max(100, "Tên quá dài"),
  company: z.string().trim().max(100, "Tên công ty quá dài").optional().or(z.literal("")),
  phone: z.string().trim().min(1, "Vui lòng nhập số điện thoại").max(20, "Số điện thoại không hợp lệ"),
  email: z.string().trim().email("Email không hợp lệ").max(255, "Email quá dài").optional().or(z.literal("")),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  date: z.string().optional().or(z.literal("")),
  time: z.string().optional().or(z.literal("")),
  location: z.string().trim().max(500, "Địa chỉ quá dài").optional().or(z.literal("")),
  description: z.string().trim().max(2000, "Mô tả quá dài").optional().or(z.literal(""))
});

const Booking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  const services = [
    "Tư vấn thiết kế dây chuyền sơn",
    "Gia công sơn tĩnh điện",
    "Hệ thống tự động hóa",
    "Bảo trì và sửa chữa",
    "Khảo sát hiện trạng",
    "Tư vấn nâng cấp hệ thống"
  ];

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00", 
    "10:00 - 11:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BK';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Validate form data
      const validatedData = bookingSchema.parse(formData);
      
      // Generate booking code
      const bookingCode = generateBookingCode();
      
      // Prepare data for database
      const bookingData = {
        booking_code: bookingCode,
        customer_name: validatedData.name,
        customer_phone: validatedData.phone,
        customer_email: validatedData.email || null,
        company_name: validatedData.company || null,
        service_type: validatedData.service,
        product_type: validatedData.service, // Using service as product type
        quantity: 1, // Default quantity
        preferred_date: validatedData.date || null,
        customer_address: validatedData.location || null,
        special_requirements: validatedData.description || null,
        status: 'pending'
      };
      
      // Insert into database
      const { error } = await supabase
        .from('bookings')
        .insert(bookingData);
      
      if (error) {
        console.error('Database error:', error);
        throw new Error('Lỗi lưu dữ liệu');
      }
      
      toast({
        title: "Đặt lịch thành công!",
        description: `Mã đặt lịch: ${bookingCode}. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.`,
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        location: "",
        description: ""
      });
      
    } catch (error) {
      console.error('Booking submission error:', error);
      
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

  const benefits = [
    {
      icon: CheckCircle,
      title: "Tư vấn miễn phí",
      description: "Khảo sát và tư vấn giải pháp không tính phí"
    },
    {
      icon: Clock,
      title: "Phản hồi nhanh",
      description: "Liên hệ xác nhận trong vòng 24 giờ"
    },
    {
      icon: Phone,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ kỹ thuật sẵn sàng hỗ trợ mọi lúc"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Đặt lịch <span className="text-accent">tư vấn</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Để lại thông tin để được tư vấn miễn phí và nhận báo giá tốt nhất 
            cho nhu cầu sơn tĩnh điện của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Booking Form */}
          <Card className="shadow-industrial">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Calendar className="mr-3 h-6 w-6 text-accent" />
                Thông tin đặt lịch
              </CardTitle>
              <CardDescription>
                Điền thông tin bên dưới để đặt lịch tư vấn với chuyên gia của chúng tôi
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
                    <Label htmlFor="company">Công ty</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Tên công ty"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="0123 456 789"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Dịch vụ quan tâm *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Ngày mong muốn</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Thời gian</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khung giờ" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot, index) => (
                          <SelectItem key={index} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm (nếu cần khảo sát)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Địa chỉ cần khảo sát"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Mô tả chi tiết về nhu cầu và yêu cầu của bạn..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="industrial" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt lịch tư vấn"}
                </Button>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Các trường có dấu (*) là bắt buộc</span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Benefits & Contact Info */}
          <div className="space-y-8">
            {/* Benefits */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Tại sao chọn chúng tôi?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Thông tin liên hệ</CardTitle>
                <CardDescription>
                  Hoặc liên hệ trực tiếp qua các thông tin bên dưới
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">0123 456 789</p>
                      <p className="text-sm text-muted-foreground">Hotline 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">info@sonhaithinhpaint.com</p>
                      <p className="text-sm text-muted-foreground">Email hỗ trợ</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">123 Đường ABC, Quận XYZ</p>
                      <p className="text-sm text-muted-foreground">TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">T2-T6: 8:00-17:00</p>
                      <p className="text-sm text-muted-foreground">T7: 8:00-12:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-card bg-gradient-accent text-accent-foreground">
              <CardHeader>
                <CardTitle>Hỗ trợ khẩn cấp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Cần hỗ trợ kỹ thuật gấp? Liên hệ hotline 24/7:
                </p>
                <Button variant="outline" className="w-full border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  <Phone className="mr-2 h-4 w-4" />
                  0123 456 789
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;