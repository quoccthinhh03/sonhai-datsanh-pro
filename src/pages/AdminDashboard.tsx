import { useState, useEffect } from 'react';
import { useRole } from '@/hooks/useRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  status: string;
  created_at: string;
  preferred_date: string | null;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { isAdmin, loading: roleLoading } = useRole();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [bookingsResponse, contactsResponse] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false })
      ]);

      if (bookingsResponse.error) throw bookingsResponse.error;
      if (contactsResponse.error) throw contactsResponse.error;

      setBookings(bookingsResponse.data || []);
      setContacts(contactsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));

      toast({
        title: "Thành công",
        description: "Đã cập nhật trạng thái đặt lịch.",
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));

      toast({
        title: "Thành công",
        description: "Đã cập nhật trạng thái liên hệ.",
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  if (roleLoading || loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Không có quyền truy cập</h1>
            <p className="text-muted-foreground">Bạn không có quyền truy cập trang quản trị.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string | null) => {
    const statusMap = {
      'pending': { label: 'Chờ xử lý', variant: 'secondary' as const },
      'confirmed': { label: 'Đã xác nhận', variant: 'default' as const },
      'completed': { label: 'Hoàn thành', variant: 'default' as const },
      'cancelled': { label: 'Đã hủy', variant: 'destructive' as const },
      'new': { label: 'Mới', variant: 'secondary' as const },
      'in_progress': { label: 'Đang xử lý', variant: 'default' as const },
      'resolved': { label: 'Đã giải quyết', variant: 'default' as const }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status || 'Không xác định', variant: 'outline' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Bảng Điều Khiển Quản Trị</h1>
            <p className="text-xl text-muted-foreground">Quản lý đặt lịch và liên hệ</p>
          </div>

          <Tabs defaultValue="bookings" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bookings">Quản Lý Đặt Lịch</TabsTrigger>
              <TabsTrigger value="contacts">Quản Lý Liên Hệ</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Danh Sách Đặt Lịch ({bookings.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã Đặt Lịch</TableHead>
                          <TableHead>Khách Hàng</TableHead>
                          <TableHead>Dịch Vụ</TableHead>
                          <TableHead>Ngày Mong Muốn</TableHead>
                          <TableHead>Trạng Thái</TableHead>
                          <TableHead>Ngày Tạo</TableHead>
                          <TableHead>Hành Động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.booking_code}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{booking.customer_name}</div>
                                <div className="text-sm text-muted-foreground">{booking.customer_email}</div>
                                <div className="text-sm text-muted-foreground">{booking.customer_phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.service_type}</TableCell>
                            <TableCell>
                              {booking.preferred_date ? format(new Date(booking.preferred_date), 'dd/MM/yyyy', { locale: vi }) : 'Chưa chọn'}
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>{format(new Date(booking.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}</TableCell>
                            <TableCell>
                              <Select
                                value={booking.status || 'pending'}
                                onValueChange={(value) => updateBookingStatus(booking.id, value)}
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                                  <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                                  <SelectItem value="completed">Hoàn thành</SelectItem>
                                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Danh Sách Liên Hệ ({contacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Chủ Đề</TableHead>
                          <TableHead>Tin Nhắn</TableHead>
                          <TableHead>Trạng Thái</TableHead>
                          <TableHead>Ngày Tạo</TableHead>
                          <TableHead>Hành Động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.subject}</TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate" title={contact.message}>
                                {contact.message}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(contact.status)}</TableCell>
                            <TableCell>{format(new Date(contact.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}</TableCell>
                            <TableCell>
                              <Select
                                value={contact.status || 'new'}
                                onValueChange={(value) => updateContactStatus(contact.id, value)}
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">Mới</SelectItem>
                                  <SelectItem value="in_progress">Đang xử lý</SelectItem>
                                  <SelectItem value="resolved">Đã giải quyết</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;