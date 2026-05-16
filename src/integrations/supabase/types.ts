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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          body_md: string
          body_md_pt: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          excerpt_pt: string | null
          id: string
          published: boolean
          published_at: string | null
          seo_description: string | null
          seo_description_pt: string | null
          seo_title: string | null
          seo_title_pt: string | null
          slug: string
          tags: string[]
          title: string
          title_pt: string | null
          updated_at: string
        }
        Insert: {
          body_md: string
          body_md_pt?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_pt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_description_pt?: string | null
          seo_title?: string | null
          seo_title_pt?: string | null
          slug: string
          tags?: string[]
          title: string
          title_pt?: string | null
          updated_at?: string
        }
        Update: {
          body_md?: string
          body_md_pt?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_pt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_description_pt?: string | null
          seo_title?: string | null
          seo_title_pt?: string | null
          slug?: string
          tags?: string[]
          title?: string
          title_pt?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      horeca_leads: {
        Row: {
          business_name: string
          contact_name: string
          created_at: string
          deadline: string | null
          email: string
          estimated_quantity: string | null
          id: string
          message: string | null
          phone: string | null
          product_type: string | null
          status: string
        }
        Insert: {
          business_name: string
          contact_name: string
          created_at?: string
          deadline?: string | null
          email: string
          estimated_quantity?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          product_type?: string | null
          status?: string
        }
        Update: {
          business_name?: string
          contact_name?: string
          created_at?: string
          deadline?: string | null
          email?: string
          estimated_quantity?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          product_type?: string | null
          status?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      production_quotes: {
        Row: {
          artwork_url: string | null
          business_name: string
          contact_name: string
          created_at: string
          deadline: string | null
          email: string
          horeca_sector: string | null
          id: string
          message: string | null
          phone: string | null
          quantity: string | null
          required_services: string[] | null
          service_type: string
          status: string
          updated_at: string
        }
        Insert: {
          artwork_url?: string | null
          business_name: string
          contact_name: string
          created_at?: string
          deadline?: string | null
          email: string
          horeca_sector?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          quantity?: string | null
          required_services?: string[] | null
          service_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          artwork_url?: string | null
          business_name?: string
          contact_name?: string
          created_at?: string
          deadline?: string | null
          email?: string
          horeca_sector?: string | null
          id?: string
          message?: string | null
          phone?: string | null
          quantity?: string | null
          required_services?: string[] | null
          service_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          author_name: string
          body: string
          created_at: string
          id: string
          product_handle: string
          product_title: string | null
          rating: number
          title: string | null
          user_id: string
        }
        Insert: {
          approved?: boolean
          author_name: string
          body: string
          created_at?: string
          id?: string
          product_handle: string
          product_title?: string | null
          rating: number
          title?: string | null
          user_id: string
        }
        Update: {
          approved?: boolean
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          product_handle?: string
          product_title?: string | null
          rating?: number
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wholesale_inquiries: {
        Row: {
          business_name: string
          contact_name: string
          created_at: string
          delivery_window: string | null
          email: string
          estimated_volume: string | null
          id: string
          notes: string | null
          phone: string | null
          product_lines: string[]
          status: string
          updated_at: string
        }
        Insert: {
          business_name: string
          contact_name: string
          created_at?: string
          delivery_window?: string | null
          email: string
          estimated_volume?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          product_lines?: string[]
          status?: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          contact_name?: string
          created_at?: string
          delivery_window?: string | null
          email?: string
          estimated_volume?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          product_lines?: string[]
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
