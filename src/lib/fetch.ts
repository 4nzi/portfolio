import fetch from 'node-fetch'

export const getAllPostsData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`)
  const posts = await res.json()
  return posts
}

export const getAllPostIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`)
  const posts = await res.json()
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}

export const getPostData = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${id}`
  )
  const post = await res.json()
  return post
}
