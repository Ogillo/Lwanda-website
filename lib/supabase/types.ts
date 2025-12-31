// TypeScript types for Supabase database
// Auto-generated from database schema

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      children: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: "Male" | "Female"
          registration_number: string
          program_type: "Child Survival" | "Sponsorship" | "Youth Development"
          enrollment_date: string
          status: "Active" | "Graduated" | "Transferred" | "Inactive"
          grade_level: string | null
          school_name: string | null
          health_status: string | null
          special_needs: string | null
          family_background: string | null
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: "Male" | "Female"
          registration_number: string
          program_type: "Child Survival" | "Sponsorship" | "Youth Development"
          enrollment_date?: string
          status?: "Active" | "Graduated" | "Transferred" | "Inactive"
          grade_level?: string | null
          school_name?: string | null
          health_status?: string | null
          special_needs?: string | null
          family_background?: string | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: "Male" | "Female"
          registration_number?: string
          program_type?: "Child Survival" | "Sponsorship" | "Youth Development"
          enrollment_date?: string
          status?: "Active" | "Graduated" | "Transferred" | "Inactive"
          grade_level?: string | null
          school_name?: string | null
          health_status?: string | null
          special_needs?: string | null
          family_background?: string | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sponsors: {
        Row: {
          id: string
          sponsor_code: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          country: string | null
          address: string | null
          sponsor_type: "Individual" | "Family" | "Organization" | "Church"
          start_date: string
          status: "Active" | "Inactive" | "Paused"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sponsor_code: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          country?: string | null
          address?: string | null
          sponsor_type?: "Individual" | "Family" | "Organization" | "Church"
          start_date?: string
          status?: "Active" | "Inactive" | "Paused"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sponsor_code?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          country?: string | null
          address?: string | null
          sponsor_type?: "Individual" | "Family" | "Organization" | "Church"
          start_date?: string
          status?: "Active" | "Inactive" | "Paused"
          created_at?: string
          updated_at?: string
        }
      }
      sponsorships: {
        Row: {
          id: string
          child_id: string
          sponsor_id: string
          start_date: string
          end_date: string | null
          status: "Active" | "Completed" | "Paused"
          monthly_amount: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          sponsor_id: string
          start_date?: string
          end_date?: string | null
          status?: "Active" | "Completed" | "Paused"
          monthly_amount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          sponsor_id?: string
          start_date?: string
          end_date?: string | null
          status?: "Active" | "Completed" | "Paused"
          monthly_amount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          donor_name: string | null
          donor_email: string | null
          donor_phone: string | null
          amount: number
          currency: string
          donation_type: "One-Time" | "Monthly" | "Annual"
          purpose: "General" | "Child Sponsorship" | "Education" | "Health" | "Infrastructure" | "Emergency"
          payment_method: string | null
          transaction_id: string | null
          status: "Pending" | "Completed" | "Failed" | "Refunded"
          sponsor_id: string | null
          anonymous: boolean
          notes: string | null
          donation_date: string
          created_at: string
        }
        Insert: {
          id?: string
          donor_name?: string | null
          donor_email?: string | null
          donor_phone?: string | null
          amount: number
          currency?: string
          donation_type: "One-Time" | "Monthly" | "Annual"
          purpose: "General" | "Child Sponsorship" | "Education" | "Health" | "Infrastructure" | "Emergency"
          payment_method?: string | null
          transaction_id?: string | null
          status?: "Pending" | "Completed" | "Failed" | "Refunded"
          sponsor_id?: string | null
          anonymous?: boolean
          notes?: string | null
          donation_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          donor_name?: string | null
          donor_email?: string | null
          donor_phone?: string | null
          amount?: number
          currency?: string
          donation_type?: "One-Time" | "Monthly" | "Annual"
          purpose?: "General" | "Child Sponsorship" | "Education" | "Health" | "Infrastructure" | "Emergency"
          payment_method?: string | null
          transaction_id?: string | null
          status?: "Pending" | "Completed" | "Failed" | "Refunded"
          sponsor_id?: string | null
          anonymous?: boolean
          notes?: string | null
          donation_date?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          event_type: "Community" | "Fundraising" | "Training" | "Celebration" | "Outreach" | "Church Service"
          start_date: string
          end_date: string
          location: string
          venue_details: string | null
          capacity: number | null
          registration_required: boolean
          registration_deadline: string | null
          featured_image: string | null
          gallery_images: string[] | null
          organizer: string | null
          contact_email: string | null
          contact_phone: string | null
          status: "Draft" | "Scheduled" | "Ongoing" | "Completed" | "Cancelled"
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          event_type: "Community" | "Fundraising" | "Training" | "Celebration" | "Outreach" | "Church Service"
          start_date: string
          end_date: string
          location: string
          venue_details?: string | null
          capacity?: number | null
          registration_required?: boolean
          registration_deadline?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          organizer?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          status?: "Draft" | "Scheduled" | "Ongoing" | "Completed" | "Cancelled"
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          event_type?: "Community" | "Fundraising" | "Training" | "Celebration" | "Outreach" | "Church Service"
          start_date?: string
          end_date?: string
          location?: string
          venue_details?: string | null
          capacity?: number | null
          registration_required?: boolean
          registration_deadline?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          organizer?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          status?: "Draft" | "Scheduled" | "Ongoing" | "Completed" | "Cancelled"
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          participant_name: string
          participant_email: string
          participant_phone: string | null
          number_of_attendees: number
          special_requirements: string | null
          registration_date: string
          attendance_status: "Registered" | "Confirmed" | "Attended" | "Cancelled"
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          participant_name: string
          participant_email: string
          participant_phone?: string | null
          number_of_attendees?: number
          special_requirements?: string | null
          registration_date?: string
          attendance_status?: "Registered" | "Confirmed" | "Attended" | "Cancelled"
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          participant_name?: string
          participant_email?: string
          participant_phone?: string | null
          number_of_attendees?: number
          special_requirements?: string | null
          registration_date?: string
          attendance_status?: "Registered" | "Confirmed" | "Attended" | "Cancelled"
          created_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: string
          title: string
          description: string | null
          media_type: "Image" | "Video"
          media_url: string
          thumbnail_url: string | null
          category:
            | "Community"
            | "Education"
            | "Health"
            | "Sponsorship"
            | "Youth Development"
            | "Volunteers"
            | "Celebrations"
            | "Infrastructure"
          tags: string[] | null
          photographer: string | null
          date_taken: string | null
          location: string | null
          featured: boolean
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          media_type: "Image" | "Video"
          media_url: string
          thumbnail_url?: string | null
          category:
            | "Community"
            | "Education"
            | "Health"
            | "Sponsorship"
            | "Youth Development"
            | "Volunteers"
            | "Celebrations"
            | "Infrastructure"
          tags?: string[] | null
          photographer?: string | null
          date_taken?: string | null
          location?: string | null
          featured?: boolean
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          media_type?: "Image" | "Video"
          media_url?: string
          thumbnail_url?: string | null
          category?:
            | "Community"
            | "Education"
            | "Health"
            | "Sponsorship"
            | "Youth Development"
            | "Volunteers"
            | "Celebrations"
            | "Infrastructure"
          tags?: string[] | null
          photographer?: string | null
          date_taken?: string | null
          location?: string | null
          featured?: boolean
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          story_type: "Child Story" | "Sponsor Story" | "Staff Story" | "Community Impact" | "Success Story"
          featured_image: string | null
          child_id: string | null
          author: string | null
          publication_date: string
          featured: boolean
          is_published: boolean
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          story_type: "Child Story" | "Sponsor Story" | "Staff Story" | "Community Impact" | "Success Story"
          featured_image?: string | null
          child_id?: string | null
          author?: string | null
          publication_date?: string
          featured?: boolean
          is_published?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          story_type?: "Child Story" | "Sponsor Story" | "Staff Story" | "Community Impact" | "Success Story"
          featured_image?: string | null
          child_id?: string | null
          author?: string | null
          publication_date?: string
          featured?: boolean
          is_published?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          contact_type: "General" | "Sponsorship" | "Volunteer" | "Partnership" | "Complaint" | "Feedback"
          status: "New" | "In Progress" | "Resolved" | "Closed"
          assigned_to: string | null
          response: string | null
          responded_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          contact_type?: "General" | "Sponsorship" | "Volunteer" | "Partnership" | "Complaint" | "Feedback"
          status?: "New" | "In Progress" | "Resolved" | "Closed"
          assigned_to?: string | null
          response?: string | null
          responded_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          contact_type?: "General" | "Sponsorship" | "Volunteer" | "Partnership" | "Complaint" | "Feedback"
          status?: "New" | "In Progress" | "Resolved" | "Closed"
          assigned_to?: string | null
          response?: string | null
          responded_at?: string | null
          created_at?: string
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          name: string | null
          status: "Active" | "Unsubscribed" | "Bounced"
          subscribed_at: string
          unsubscribed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          status?: "Active" | "Unsubscribed" | "Bounced"
          subscribed_at?: string
          unsubscribed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          status?: "Active" | "Unsubscribed" | "Bounced"
          subscribed_at?: string
          unsubscribed_at?: string | null
          created_at?: string
        }
      }
      volunteer_applications: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string | null
          address: string | null
          city: string | null
          country: string | null
          occupation: string | null
          skills: string | null
          areas_of_interest: string[] | null
          availability: string | null
          start_date: string | null
          duration: string | null
          previous_experience: string | null
          motivation: string
          references: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          status: "Pending" | "Reviewing" | "Approved" | "Rejected" | "Active" | "Completed"
          reviewed_by: string | null
          reviewed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          occupation?: string | null
          skills?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          start_date?: string | null
          duration?: string | null
          previous_experience?: string | null
          motivation: string
          references?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          status?: "Pending" | "Reviewing" | "Approved" | "Rejected" | "Active" | "Completed"
          reviewed_by?: string | null
          reviewed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          occupation?: string | null
          skills?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          start_date?: string | null
          duration?: string | null
          previous_experience?: string | null
          motivation?: string
          references?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          status?: "Pending" | "Reviewing" | "Approved" | "Rejected" | "Active" | "Completed"
          reviewed_by?: string | null
          reviewed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          program_type: "Child Survival" | "Sponsorship" | "Youth Development"
          objectives: string[] | null
          target_age_range: string | null
          capacity: number | null
          current_enrollment: number
          start_date: string
          status: "Planning" | "Active" | "On Hold" | "Completed"
          budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          program_type: "Child Survival" | "Sponsorship" | "Youth Development"
          objectives?: string[] | null
          target_age_range?: string | null
          capacity?: number | null
          current_enrollment?: number
          start_date: string
          status?: "Planning" | "Active" | "On Hold" | "Completed"
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          program_type?: "Child Survival" | "Sponsorship" | "Youth Development"
          objectives?: string[] | null
          target_age_range?: string | null
          capacity?: number | null
          current_enrollment?: number
          start_date?: string
          status?: "Planning" | "Active" | "On Hold" | "Completed"
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      monthly_statistics: {
        Row: {
          id: string
          month: string
          total_children: number
          new_enrollments: number
          total_sponsors: number
          new_sponsors: number
          total_donations: number
          total_events: number
          volunteer_hours: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          month: string
          total_children?: number
          new_enrollments?: number
          total_sponsors?: number
          new_sponsors?: number
          total_donations?: number
          total_events?: number
          volunteer_hours?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          month?: string
          total_children?: number
          new_enrollments?: number
          total_sponsors?: number
          new_sponsors?: number
          total_donations?: number
          total_events?: number
          volunteer_hours?: number
          created_at?: string
          updated_at?: string
        }
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
  }
}
