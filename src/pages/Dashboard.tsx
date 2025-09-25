import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Eye,
  User,
  LogOut,
  Phone,
  Mail,
  Clock,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Booking {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  company_name: string | null;
  service_type: string;
  preferred_date: string | null;
  customer_address: string | null;
  special_requirements: string | null;
  status: string | null;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch bookings
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (bookingError) {
        console.error('Error fetching bookings:', bookingError);
      } else {
        setBookings(bookingData || []);
      }

      // Fetch contacts
      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (contactError) {
        console.error('Error fetching contacts:', contactError);
      } else {
        setContacts(contactData || []);
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể tải dữ liệu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Xóa thành công",
        description: "Đã xóa lịch đặt"
      });

      setBookings(prev => prev.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể xóa lịch đặt",
        variant: "destructive"
      });
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Xóa thành công",
        description: "Đã xóa tin nhắn liên hệ"
      });

      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể xóa tin nhắn",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn lần sau"
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      case 'new': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'pending': return 'Đang chờ';
      case 'confirmed': return 'Đã xác nhận';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      case 'new': return 'Mới';
      default: return 'Đang chờ';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Xin chào, <span className="text-accent">{user?.email}</span>
            </h1>
            <p className="text-muted-foreground">Quản lý thông tin đặt lịch và liên hệ của bạn</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <User className="mr-2 h-4 w-4" />
              Trang chủ
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{bookings.length}</p>
                  <p className="text-sm text-muted-foreground">Lịch đặt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{contacts.length}</p>
                  <p className="text-sm text-muted-foreground">Tin nhắn liên hệ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">Hoạt động</p>
                  <p className="text-sm text-muted-foreground">Tài khoản</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Lịch đặt ({bookings.length})</TabsTrigger>
            <TabsTrigger value="contacts">Liên hệ ({contacts.length})</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="shadow-industrial">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-accent" />
                  Lịch đặt của bạn
                </CardTitle>
                <CardDescription>
                  Quản lý các lịch đặt tư vấn và dịch vụ
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Bạn chưa có lịch đặt nào</p>
                    <Button onClick={() => navigate('/booking')}>
                      Đặt lịch ngay
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="shadow-card">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <Badge variant={getStatusBadgeVariant(booking.status)}>
                                  {getStatusText(booking.status)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Mã: {booking.booking_code}
                                </span>
                              </div>
                              
                              <h3 className="font-semibold text-primary mb-2">
                                {booking.service_type}
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.customer_name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.customer_phone}</span>
                                </div>
                                {booking.customer_email && (
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.customer_email}</span>
                                  </div>
                                )}
                                {booking.preferred_date && (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(booking.preferred_date).toLocaleDateString('vi-VN')}</span>
                                  </div>
                                )}
                                {booking.customer_address && (
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.customer_address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Chi tiết lịch đặt</DialogTitle>
                                    <DialogDescription>
                                      Mã đặt lịch: {booking.booking_code}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Thông tin dịch vụ</h4>
                                      <p>{booking.service_type}</p>
                                    </div>
                                    {booking.special_requirements && (
                                      <div>
                                        <h4 className="font-semibold mb-2">Yêu cầu đặc biệt</h4>
                                        <p>{booking.special_requirements}</p>
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-semibold mb-2">Ngày tạo</h4>
                                      <p>{new Date(booking.created_at).toLocaleString('vi-VN')}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn có chắc chắn muốn xóa lịch đặt này? 
                                      Hành động này không thể hoàn tác.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Xóa
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="shadow-industrial">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5 text-accent" />
                  Tin nhắn liên hệ
                </CardTitle>
                <CardDescription>
                  Theo dõi các tin nhắn liên hệ của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Bạn chưa có tin nhắn liên hệ nào</p>
                    <Button onClick={() => navigate('/contact')}>
                      Liên hệ ngay
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <Card key={contact.id} className="shadow-card">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <Badge variant={getStatusBadgeVariant(contact.status)}>
                                  {getStatusText(contact.status)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(contact.created_at).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                              
                              <h3 className="font-semibold text-primary mb-2">
                                {contact.subject || "Liên hệ tư vấn"}
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{contact.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span>{contact.email}</span>
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{contact.phone}</span>
                                  </div>
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {contact.message}
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Chi tiết tin nhắn</DialogTitle>
                                    <DialogDescription>
                                      Từ: {contact.name} ({contact.email})
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Tiêu đề</h4>
                                      <p>{contact.subject || "Không có tiêu đề"}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Nội dung</h4>
                                      <p className="whitespace-pre-wrap">{contact.message}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Ngày gửi</h4>
                                      <p>{new Date(contact.created_at).toLocaleString('vi-VN')}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn có chắc chắn muốn xóa tin nhắn này? 
                                      Hành động này không thể hoàn tác.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteContact(contact.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Xóa
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;