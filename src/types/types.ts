export interface POST {
  id: number
  title: string
  description: string
  thum: string | null
  images?: Array<{
    file: string
    caption?: string
  }>
  created_on: string
}
