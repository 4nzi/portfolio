export interface POST {
  id: number
  title: string
  description: string
  thum: string
  images?: Array<{
    file: string
    caption?: string
  }>
  created_on: string
}
