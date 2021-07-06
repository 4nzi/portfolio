import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import Cookie from 'universal-cookie'
import { POST, NEW_POST } from '../types/Types'

export const useMutatePost = () => {
  const cookie = new Cookie()
  const token = cookie.get('access_token')
  const queryClient = useQueryClient()

  /* DELETE */
  const deletePostMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousPosts = queryClient.getQueryData<POST[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<POST[]>(
            'posts',
            previousPosts.filter((post) => post.id !== variables)
          )
        }
      },
      onError: () => {
        alert('削除に失敗しました。')
      },
    }
  )

  /* POST */
  const newPost = async (payload: NEW_POST) => {
    const uploadData = new FormData()
    uploadData.append('title', payload.title)
    uploadData.append('description', payload.description)
    uploadData.append('thum', payload.thum, payload.thum.name)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      const previousPosts = queryClient.getQueryData<POST[]>('posts')
      if (previousPosts) {
        queryClient.setQueryData<POST[]>('posts', [res.data, ...previousPosts])
      }

      payload.images.map(async (image) => {
        const uploadImage = new FormData()
        uploadImage.append('file', image)
        uploadImage.append('post', String(res.data.id))
        await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/images/`,
          uploadImage,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${token}`,
            },
          }
        )
      })
    } catch {
      alert('投稿に失敗しました')
    }
  }
  return { deletePostMutation, newPost }
}
