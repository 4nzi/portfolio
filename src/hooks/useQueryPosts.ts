import { useQuery } from 'react-query'
import axios from 'axios'
import { POST } from '../types/Types'

export const getPosts = async () => {
  const { data } = await axios.get<POST[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`
  )
  return data
}

export const getPostIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`)
  const posts = await res.json()
  return posts.map((post: POST) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}

export const getPost = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${id}`
  )
  const post = await res.json()
  return post
}

export const useQueryPosts = () => {
  return useQuery<POST[], Error>({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 0,
    refetchOnWindowFocus: true,
    //cacheTime: 5000,
    //refetchInterval: 5000,
  })
}
