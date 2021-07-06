/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import 'setimmediate'

initTestHelpers()

process.env.NEXT_PUBLIC_RESTAPI_URL = 'http://test/'

const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'title1',
            description: 'description1',
            thum: 'thum1',
            images: [
              { id: 1, file: 'file1', caption: '', post: 1 },
              { id: 2, file: 'file2', caption: '', post: 2 },
            ],
          },
          {
            id: 2,
            title: 'title2',
            description: 'description2',
            thum: 'thum2',
            images: [
              { id: 1, file: 'file1', caption: '', post: 1 },
              { id: 2, file: 'file2', caption: '', post: 2 },
            ],
          },
        ])
      )
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`,
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          id: 3,
          title: 'title3',
          description: 'description3',
          thum: 'thum3',
          images: [
            { id: 1, file: 'file1', caption: '', post: 1 },
            { id: 2, file: 'file2', caption: '', post: 2 },
          ],
        })
      )
    }
  ),
  rest.delete(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/1`,
    (req, res, ctx) => {
      return res(ctx.status(200))
    }
  ),
  rest.delete(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/2`,
    (req, res, ctx) => {
      return res(ctx.status(200))
    }
  ),
]
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
  document.cookie =
    'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})
afterAll(() => {
  server.close()
})

describe('AdminPage Test Cases', () => {
  it('Should route back to index page', async () => {
    document.cookie = 'access_token=123xyz'
    const { page } = await getPage({
      route: '/admin',
    })
    render(page)
    expect(await screen.findByText('管理ページ')).toBeInTheDocument()
    userEvent.click(screen.getByText('サイトに戻る'))
    expect(await screen.findByText('4NZI')).toBeInTheDocument()
  })
})
it('should route back to login page when no coockie', async () => {
  const { page } = await getPage({
    route: '/admin',
  })
  render(page)
  expect(await screen.findByText('Login')).toBeInTheDocument()
})
it('Should render the list of posts fetched by react-query', async () => {
  document.cookie = 'access_token=123xyz'
  const { page } = await getPage({
    route: '/admin',
  })
  render(page)
  expect(await screen.findByText('管理ページ')).toBeInTheDocument()
  expect(await screen.findByText('title1')).toBeInTheDocument()
  expect(await screen.findByText('title2')).toBeInTheDocument()
})
