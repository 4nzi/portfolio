import { useQuery } from 'react-query'
import axios from 'axios'
import { POST } from '../types/Types'

const getPosts = async () => {
  const { data } = await axios.get<POST[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`
  )
  return data
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
