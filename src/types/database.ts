// Auto-generated database types matching Supabase schema
// Update this file when you run: supabase gen types typescript --local

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'admin'
export type UserPlan = 'starter' | 'builder' | 'full-arsenal'
export type BlogStatus = 'draft' | 'published'
export type ContactStatus = 'new' | 'read' | 'replied'
export type CaseStudyStatus = 'draft' | 'published'

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: UserRole
          plan: UserPlan
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          avatar_url?: string | null
          role?: UserRole
          plan?: UserPlan
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          role?: UserRole
          plan?: UserPlan
          is_active?: boolean
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image_url: string | null
          category: string
          tags: string[]
          author_id: string | null
          status: BlogStatus
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          read_time_minutes: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          category?: string
          tags?: string[]
          author_id?: string | null
          status?: BlogStatus
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          read_time_minutes?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          category?: string
          tags?: string[]
          author_id?: string | null
          status?: BlogStatus
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          read_time_minutes?: number
          published_at?: string | null
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          topic: string
          message: string
          company: string | null
          phone: string | null
          status: ContactStatus
          admin_notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          topic?: string
          message: string
          company?: string | null
          phone?: string | null
          status?: ContactStatus
          admin_notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          topic?: string
          message?: string
          company?: string | null
          phone?: string | null
          status?: ContactStatus
          admin_notes?: string
          updated_at?: string
        }
      }
      case_studies: {
        Row: {
          id: string
          title: string
          slug: string
          client_name: string
          industry: string
          challenge: string
          solution: string
          results: string
          content: string
          cover_image_url: string | null
          gallery_images: string[]
          metrics: CaseStudyMetric[]
          timeline: string
          status: CaseStudyStatus
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          client_name?: string
          industry?: string
          challenge?: string
          solution?: string
          results?: string
          content?: string
          cover_image_url?: string | null
          gallery_images?: string[]
          metrics?: CaseStudyMetric[]
          timeline?: string
          status?: CaseStudyStatus
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          client_name?: string
          industry?: string
          challenge?: string
          solution?: string
          results?: string
          content?: string
          cover_image_url?: string | null
          gallery_images?: string[]
          metrics?: CaseStudyMetric[]
          timeline?: string
          status?: CaseStudyStatus
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published_at?: string | null
          updated_at?: string
        }
      }
    }
  }
}

// Convenience row types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Blog = Database['public']['Tables']['blogs']['Row']
export type Contact = Database['public']['Tables']['contacts']['Row']
export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

// Blog with author profile joined
export type BlogWithAuthor = Blog & {
  profiles: Pick<Profile, 'full_name' | 'avatar_url'> | null
}
