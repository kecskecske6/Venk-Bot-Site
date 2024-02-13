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
      games: {
        Row: {
          id: number
          name: string
          releaseDate: string
        }
        Insert: {
          id?: number
          name: string
          releaseDate: string
        }
        Update: {
          id?: number
          name?: string
          releaseDate?: string
        }
        Relationships: []
      }
      loginTokens: {
        Row: {
          deviceInfo: string
          id: number
          loginDate: string
          token: string
          userId: number
        }
        Insert: {
          deviceInfo: string
          id?: number
          loginDate: string
          token: string
          userId: number
        }
        Update: {
          deviceInfo?: string
          id?: number
          loginDate?: string
          token?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "loginTokens_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mods: {
        Row: {
          authorId: number
          description: string | null
          fileUrl: string
          gameId: number | null
          id: number
          image: string | null
          name: string
          uploadDate: string
        }
        Insert: {
          authorId: number
          description?: string | null
          fileUrl: string
          gameId?: number | null
          id?: number
          image?: string | null
          name: string
          uploadDate: string
        }
        Update: {
          authorId?: number
          description?: string | null
          fileUrl?: string
          gameId?: number | null
          id?: number
          image?: string | null
          name?: string
          uploadDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "mods_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mods_gameId_fkey"
            columns: ["gameId"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          email: string
          id: number
          password: string
          roleId: number
          token: string
          username: string
          validated: boolean
        }
        Insert: {
          avatar?: string | null
          email: string
          id?: number
          password: string
          roleId: number
          token: string
          username: string
          validated: boolean
        }
        Update: {
          avatar?: string | null
          email?: string
          id?: number
          password?: string
          roleId?: number
          token?: string
          username?: string
          validated?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_roleId_fkey"
            columns: ["roleId"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
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
