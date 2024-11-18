export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          lemon_squeezy_customer_id: string | null
        }
        Insert: {
          id: string
          lemon_squeezy_customer_id?: string | null
        }
        Update: {
          id?: string
          lemon_squeezy_customer_id?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          description: string | null
          id: number
          interval: string | null
          interval_count: number | null
          is_usage_based: boolean | null
          name: string
          price: string
          product_id: number
          product_name: string | null
          sort: number | null
          trial_interval: string | null
          trial_interval_count: number | null
          variant_id: number
        }
        Insert: {
          description?: string | null
          id?: number
          interval?: string | null
          interval_count?: number | null
          is_usage_based?: boolean | null
          name: string
          price: string
          product_id: number
          product_name?: string | null
          sort?: number | null
          trial_interval?: string | null
          trial_interval_count?: number | null
          variant_id: number
        }
        Update: {
          description?: string | null
          id?: number
          interval?: string | null
          interval_count?: number | null
          is_usage_based?: boolean | null
          name?: string
          price?: string
          product_id?: number
          product_name?: string | null
          sort?: number | null
          trial_interval?: string | null
          trial_interval_count?: number | null
          variant_id?: number
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          email: string
          ends_at: string | null
          id: number
          is_paused: boolean | null
          is_usage_based: boolean | null
          lemon_squeezy_id: string
          name: string
          order_id: number
          plan_id: number
          price: string
          renews_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          status_formatted: string
          subscription_item_id: number
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          ends_at?: string | null
          id?: number
          is_paused?: boolean | null
          is_usage_based?: boolean | null
          lemon_squeezy_id: string
          name: string
          order_id: number
          plan_id: number
          price: string
          renews_at?: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          status_formatted: string
          subscription_item_id?: number
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          ends_at?: string | null
          id?: number
          is_paused?: boolean | null
          is_usage_based?: boolean | null
          lemon_squeezy_id?: string
          name?: string
          order_id?: number
          plan_id?: number
          price?: string
          renews_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          status_formatted?: string
          subscription_item_id?: number
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: []
      }
      webhookevent: {
        Row: {
          body: Json
          createdat: string
          eventname: string
          id: string
          processed: boolean | null
          processingerror: string | null
        }
        Insert: {
          body: Json
          createdat?: string
          eventname: string
          id?: string
          processed?: boolean | null
          processingerror?: string | null
        }
        Update: {
          body?: Json
          createdat?: string
          eventname?: string
          id?: string
          processed?: boolean | null
          processingerror?: string | null
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
      subscription_status:
        | "on_trial"
        | "active"
        | "paused"
        | "past_due"
        | "unpaid"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
