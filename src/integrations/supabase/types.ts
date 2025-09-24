export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          actual_completion_date: string | null
          actual_start_date: string | null
          admin_notes: string | null
          booking_code: string
          color_code: string | null
          color_name: string | null
          company_name: string | null
          created_at: string | null
          customer_address: string | null
          customer_email: string | null
          customer_feedback: string | null
          customer_name: string
          customer_phone: string
          design_files: string[] | null
          dimensions: Json | null
          estimated_completion_days: number | null
          estimated_price: number | null
          final_price: number | null
          id: string
          preferred_date: string | null
          priority: string | null
          product_images: string[] | null
          product_type: string
          quantity: number
          rating: number | null
          service_type: string
          special_requirements: string | null
          status: string | null
          surface_area: number | null
          updated_at: string | null
        }
        Insert: {
          actual_completion_date?: string | null
          actual_start_date?: string | null
          admin_notes?: string | null
          booking_code: string
          color_code?: string | null
          color_name?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_address?: string | null
          customer_email?: string | null
          customer_feedback?: string | null
          customer_name: string
          customer_phone: string
          design_files?: string[] | null
          dimensions?: Json | null
          estimated_completion_days?: number | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          preferred_date?: string | null
          priority?: string | null
          product_images?: string[] | null
          product_type: string
          quantity: number
          rating?: number | null
          service_type: string
          special_requirements?: string | null
          status?: string | null
          surface_area?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_completion_date?: string | null
          actual_start_date?: string | null
          admin_notes?: string | null
          booking_code?: string
          color_code?: string | null
          color_name?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_address?: string | null
          customer_email?: string | null
          customer_feedback?: string | null
          customer_name?: string
          customer_phone?: string
          design_files?: string[] | null
          dimensions?: Json | null
          estimated_completion_days?: number | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          preferred_date?: string | null
          priority?: string | null
          product_images?: string[] | null
          product_type?: string
          quantity?: number
          rating?: number | null
          service_type?: string
          special_requirements?: string | null
          status?: string | null
          surface_area?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          admin_reply: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          admin_reply?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          admin_reply?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          is_active: boolean | null
          tags: string[] | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          slug: string
          template: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          template?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          template?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          images: string[] | null
          is_active: boolean | null
          name: string
          price: number | null
          short_description: string | null
          slug: string
          specifications: Json | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name: string
          price?: number | null
          short_description?: string | null
          slug: string
          specifications?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name?: string
          price?: number | null
          short_description?: string | null
          slug?: string
          specifications?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_name: string | null
          completion_date: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          location: string | null
          project_value: number | null
          services_used: string[] | null
          short_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          project_value?: number | null
          services_used?: string[] | null
          short_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          project_value?: number | null
          services_used?: string[] | null
          short_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price_from: number | null
          price_to: number | null
          short_description: string | null
          slug: string
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price_from?: number | null
          price_to?: number | null
          short_description?: string | null
          slug: string
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price_from?: number | null
          price_to?: number | null
          short_description?: string | null
          slug?: string
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          type: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      workshop_schedule: {
        Row: {
          booking_id: string | null
          created_at: string | null
          end_time: string | null
          id: string
          notes: string | null
          scheduled_date: string
          start_time: string | null
          station_name: string | null
          status: string | null
          technician_name: string | null
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          scheduled_date: string
          start_time?: string | null
          station_name?: string | null
          status?: string | null
          technician_name?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          scheduled_date?: string
          start_time?: string | null
          station_name?: string | null
          status?: string | null
          technician_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workshop_schedule_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
