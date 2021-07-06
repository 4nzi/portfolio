export interface USER {
  username: string
  password: string
}

export interface POST {
  id: number
  title: string
  description: string
  thum: string
  images?: Array<{
    id: number
    file: string
    caption?: string
    post: number
  }>
  created_on: string
}

export interface NEW_POST {
  thum: File | null
  title: string
  description: string
  images: File[]
}
