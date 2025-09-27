-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create projects table for dynamic content
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[],
    client_name TEXT,
    completion_date DATE,
    project_duration TEXT,
    technologies TEXT[],
    results TEXT[],
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own role" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policies for projects (public read, admin write)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update bookings policies for admin access
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete their own bookings" ON public.bookings;

CREATE POLICY "Users can view their own bookings or admins can view all" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own bookings or admins can update all" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their own bookings or admins can delete all" 
ON public.bookings 
FOR DELETE 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Update contacts policies for admin access
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;

CREATE POLICY "Users can view their own contacts or admins can view all" 
ON public.contacts 
FOR SELECT 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own contacts or admins can update all" 
ON public.contacts 
FOR UPDATE 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their own contacts or admins can delete all" 
ON public.contacts 
FOR DELETE 
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample projects data
INSERT INTO public.projects (title, description, content, category, tags, client_name, completion_date, project_duration, technologies, results, featured) VALUES
('Hệ thống phủ sơn tự động cho ô tô', 'Triển khai dây chuyền phủ sơn hoàn toàn tự động cho nhà máy sản xuất ô tô', 'Dự án này bao gồm việc thiết kế và lắp đặt một hệ thống phủ sơn hoàn toàn tự động cho dây chuyền sản xuất ô tô. Hệ thống sử dụng công nghệ robot tiên tiến để đảm bảo chất lượng phủ sơn đồng đều và giảm thiểu lãng phí vật liệu.

**Mục tiêu dự án:**
- Tự động hóa 100% quy trình phủ sơn
- Giảm 30% lượng sơn tiêu thụ
- Tăng 40% năng suất sản xuất
- Đảm bảo chất lượng phủ sơn đồng đều

**Quy trình thực hiện:**
1. Khảo sát và phân tích yêu cầu kỹ thuật
2. Thiết kế hệ thống và lập kế hoạch triển khai
3. Lắp đặt thiết bị và hệ thống điều khiển
4. Thử nghiệm và tinh chỉnh hệ thống
5. Đào tạo vận hành và bàn giao

**Kết quả đạt được:**
- Giảm 35% chi phí vật liệu
- Tăng 45% năng suất
- Chất lượng sản phẩm đạt tiêu chuẩn quốc tế
- Thời gian hoàn thành sớm hơn dự kiến 2 tuần', 'industrial', ARRAY['tự động hóa', 'phủ sơn', 'ô tô', 'robot'], 'Công ty TNHH Ô tô Việt Nam', '2024-03-15', '8 tháng', ARRAY['Robot ABB', 'PLC Siemens', 'Hệ thống sơn Dürr'], ARRAY['Giảm 35% chi phí vật liệu', 'Tăng 45% năng suất', 'Chất lượng đạt tiêu chuẩn quốc tế'], true),

('Phủ sơn chống ăn mòn cho cầu thép', 'Dự án phủ sơn bảo vệ chống ăn mòn cho cây cầu thép dài 2km', 'Dự án phủ sơn bảo vệ chống ăn mòn cho cây cầu thép quan trọng, đảm bảo tuổi thọ công trình lên đến 25 năm trong điều kiện khí hậu nhiệt đới ẩm.

**Thách thức của dự án:**
- Làm việc ở độ cao lớn (80m)
- Điều kiện thời tiết khắc nghiệt
- Yêu cầu kỹ thuật nghiêm ngặt về độ bền
- Không được gián đoạn giao thông

**Giải pháp áp dụng:**
1. Sử dụng sơn epoxy zinc-rich primer cao cấp
2. Hệ thống phủ sơn 3 lớp chuyên dụng
3. Công nghệ phun sơn không khí nén
4. Kiểm soát chất lượng 24/7

**Quy trình thi công:**
- Chuẩn bị bề mặt: Sa thép cấp độ Sa 2.5
- Lớp sơn lót: Zinc-rich epoxy primer
- Lớp sơn trung gian: Epoxy intermediate coat  
- Lớp sơn hoàn thiện: Polyurethane topcoat

**Cam kết chất lượng:**
- Bảo hành 15 năm
- Kiểm tra định kỳ hàng năm
- Bảo trì theo kế hoạch', 'infrastructure', ARRAY['cầu thép', 'chống ăn mòn', 'cơ sở hạ tầng'], 'Sở Giao thông Vận tải TP.HCM', '2024-06-20', '6 tháng', ARRAY['Sơn Jotun', 'Thiết bị Graco', 'Hệ thống an toàn độ cao'], ARRAY['Bảo vệ cầu trong 25 năm', 'Tiết kiệm 60% chi phí bảo trì', 'Hoàn thành đúng tiến độ'], true),

('Sơn trang trí nội thất cao cấp', 'Thi công sơn trang trí nội thất cho tòa nhà văn phòng 40 tầng', 'Dự án thi công sơn trang trí nội thất cho tòa nhà văn phòng hạng A, tạo không gian làm việc hiện đại và chuyên nghiệp cho hơn 5000 nhân viên.

**Đặc điểm dự án:**
- Diện tích: 50,000m²
- 40 tầng với thiết kế đa dạng
- Yêu cầu thẩm mỹ cao
- Thời gian thi công ngắn

**Giải pháp sơn cao cấp:**
1. Sơn nước không VOC thân thiện môi trường
2. Màu sắc theo tiêu chuẩn quốc tế
3. Hiệu ứng đặc biệt: metallic, texture
4. Hệ thống sơn chống cháy

**Kỹ thuật thi công:**
- Phun sơn bằng máy airless
- Sơn bằng con lăn cao cấp
- Kỹ thuật sơn nghệ thuật
- Kiểm soát chất lượng từng lớp

**Màu sắc và thiết kế:**
- 15 tông màu chủ đạo
- Hiệu ứng gradient và ombre
- Sơn trang trí logo và biểu tượng
- Phối hợp với hệ thống ánh sáng', 'commercial', ARRAY['nội thất', 'văn phòng', 'trang trí', 'cao cấp'], 'Tập đoàn Bất động sản ABC', '2024-01-10', '4 tháng', ARRAY['Sơn Dulux', 'Máy phun Wagner', 'Hệ thống màu NCS'], ARRAY['Không gian làm việc hiện đại', 'Tiết kiệm 20% thời gian', 'Đạt chứng nhận Green Building'], false),

('Phủ sơn bảo vệ thiết bị hàng hải', 'Dự án phủ sơn chống ăn mòn cho tàu container 50,000 tấn', 'Dự án sửa chữa và phủ sơn bảo vệ cho tàu container lớn, đảm bảo khả năng chống ăn mòn trong môi trường biển khắc nghiệt.

**Yêu cầu kỹ thuật:**
- Chống ăn mòn nước biển
- Chịu được sóng và gió lớn  
- Tuổi thọ tối thiểu 10 năm
- Tuân thủ tiêu chuẩn IMO

**Hệ thống sơn chuyên dụng:**
1. Shop primer: Zinc silicate
2. Holding primer: Epoxy zinc rich
3. Intermediate coat: Epoxy mastic
4. Finish coat: Polysiloxane

**Quy trình thi công:**
- Làm sạch bề mặt bằng steel grit
- Kiểm tra độ nhám và độ sạch
- Phun sơn từng lớp theo quy định
- Kiểm tra độ dày và độ bám dính

**Kiểm soát chất lượng:**
- Đo độ dày sơn bằng thiết bị điện tử
- Test độ bám dính theo ASTM D4541
- Kiểm tra độ bóng và màu sắc
- Thử nghiệm chống ăn mòn nhanh', 'marine', ARRAY['hàng hải', 'tàu biển', 'chống ăn mòn'], 'Công ty Vận tải Biển Sài Gòn', '2024-05-30', '3 tháng', ARRAY['Sơn Hempel', 'Thiết bị Airless', 'Thử nghiệm Elcometer'], ARRAY['Bảo vệ tàu 10+ năm', 'Tiết kiệm 40% chi phí bảo trì', 'Đạt tiêu chuẩn quốc tế'], false);