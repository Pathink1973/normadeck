export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      normas: {
        Row: {
          id: string
          nome: string
          pais: string
          categoria: string | null
          ano: string | null
          imagem_url: string
          pdf_url: string
          created_at: string
          autor: string | null
        }
        Insert: {
          id?: string
          nome: string
          pais: string
          categoria?: string | null
          ano?: string | null
          imagem_url: string
          pdf_url: string
          created_at?: string
          autor?: string | null
        }
        Update: {
          id?: string
          nome?: string
          pais?: string
          categoria?: string | null
          ano?: string | null
          imagem_url?: string
          pdf_url?: string
          created_at?: string
          autor?: string | null
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