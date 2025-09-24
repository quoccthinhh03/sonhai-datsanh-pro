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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      card_topup_history: {
        Row: {
          amount: number
          card_id: string
          created_at: string | null
          id: number
          payment_method: string
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string | null
          id?: number
          payment_method: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string | null
          id?: number
          payment_method?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_topup_history_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          balance: number
          created_at: string | null
          email: string | null
          face_encoding: string | null
          id: string
          name: string
          password: string | null
          phone: string
          qr_cloudinary_url: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          balance?: number
          created_at?: string | null
          email?: string | null
          face_encoding?: string | null
          id: string
          name: string
          password?: string | null
          phone: string
          qr_cloudinary_url?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          balance?: number
          created_at?: string | null
          email?: string | null
          face_encoding?: string | null
          id?: string
          name?: string
          password?: string | null
          phone?: string
          qr_cloudinary_url?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: []
      }
      license_plate_recognition: {
        Row: {
          confidence: string | null
          id: number
          image_path: string
          license_plate: string | null
          plate_color: string | null
          plate_type: string | null
          recognition_time: string
          vehicle_type: string | null
        }
        Insert: {
          confidence?: string | null
          id?: number
          image_path: string
          license_plate?: string | null
          plate_color?: string | null
          plate_type?: string | null
          recognition_time: string
          vehicle_type?: string | null
        }
        Update: {
          confidence?: string | null
          id?: number
          image_path?: string
          license_plate?: string | null
          plate_color?: string | null
          plate_type?: string | null
          recognition_time?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
      momo_transactions: {
        Row: {
          amount: number
          card_id: string | null
          created_at: string | null
          exit_face_image_path: string | null
          exit_plate_image_path: string | null
          id: number
          license_plate: string
          order_id: string
          status: string | null
          transaction_type: string | null
          vehicle_id: number | null
        }
        Insert: {
          amount: number
          card_id?: string | null
          created_at?: string | null
          exit_face_image_path?: string | null
          exit_plate_image_path?: string | null
          id?: number
          license_plate: string
          order_id: string
          status?: string | null
          transaction_type?: string | null
          vehicle_id?: number | null
        }
        Update: {
          amount?: number
          card_id?: string | null
          created_at?: string | null
          exit_face_image_path?: string | null
          exit_plate_image_path?: string | null
          id?: number
          license_plate?: string
          order_id?: string
          status?: string | null
          transaction_type?: string | null
          vehicle_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "momo_transactions_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "parked_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      overnight_fee: {
        Row: {
          description: string | null
          fee_amount: number
          id: number
          updated_at: string | null
          vehicle_type: string | null
        }
        Insert: {
          description?: string | null
          fee_amount?: number
          id?: number
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Update: {
          description?: string | null
          fee_amount?: number
          id?: number
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      parked_vehicles: {
        Row: {
          card_id: string | null
          entry_time: string
          exit_face_image_path: string | null
          exit_plate_image_path: string | null
          exit_time: string | null
          face_encoding: string | null
          face_image_path: string | null
          id: number
          license_plate: string
          plate_color: string | null
          plate_image_path: string | null
          plate_type: string | null
          qr_code_path: string | null
          status: string | null
          vehicle_type: string | null
        }
        Insert: {
          card_id?: string | null
          entry_time: string
          exit_face_image_path?: string | null
          exit_plate_image_path?: string | null
          exit_time?: string | null
          face_encoding?: string | null
          face_image_path?: string | null
          id?: number
          license_plate: string
          plate_color?: string | null
          plate_image_path?: string | null
          plate_type?: string | null
          qr_code_path?: string | null
          status?: string | null
          vehicle_type?: string | null
        }
        Update: {
          card_id?: string | null
          entry_time?: string
          exit_face_image_path?: string | null
          exit_plate_image_path?: string | null
          exit_time?: string | null
          face_encoding?: string | null
          face_image_path?: string | null
          id?: number
          license_plate?: string
          plate_color?: string | null
          plate_image_path?: string | null
          plate_type?: string | null
          qr_code_path?: string | null
          status?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      parking_space_config: {
        Row: {
          daily_capacity: number
          description: string | null
          id: number
          max_capacity: number
          updated_at: string | null
        }
        Insert: {
          daily_capacity?: number
          description?: string | null
          id?: number
          max_capacity?: number
          updated_at?: string | null
        }
        Update: {
          daily_capacity?: number
          description?: string | null
          id?: number
          max_capacity?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_config: {
        Row: {
          created_at: string | null
          description: string | null
          end_hour: number
          end_minute: number | null
          id: number
          price: number
          start_hour: number
          start_minute: number | null
          time_slot_name: string
          updated_at: string | null
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_hour: number
          end_minute?: number | null
          id?: number
          price: number
          start_hour: number
          start_minute?: number | null
          time_slot_name: string
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_hour?: number
          end_minute?: number | null
          id?: number
          price?: number
          start_hour?: number
          start_minute?: number | null
          time_slot_name?: string
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          card_id: string
          created_at: string | null
          id: string
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string | null
          id?: string
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string | null
          id?: string
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: []
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
