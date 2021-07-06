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
  rest.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/1/`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          title: 'title1',
          description: 'description1',
          thum: 'thum1',
          images: [
            { id: 1, file: 'file1', caption: '', post: 1 },
            { id: 2, file: 'file2', caption: '', post: 2 },
          ],
        })
      )
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/2/`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 2,
          title: 'title2',
          description: 'description2',
          thum: 'thum2',
          images: [
            { id: 1, file: 'file1', caption: '', post: 1 },
            { id: 2, file: 'file2', caption: '', post: 2 },
          ],
        })
      )
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
})
afterAll(() => {
  server.close()
})
describe('PostDetailPage Test Cases', () => {
  it('Should render detailed content of ID 1', async () => {
    const { page } = await getPage({
      route: '/posts/1',
    })
    render(page)
    expect(await screen.findByText('title1')).toBeInTheDocument()
  })
})
it('Should render detailed content of ID 2', async () => {
  const { page } = await getPage({
    route: '/posts/2',
  })
  render(page)
  expect(await screen.findByText('title2')).toBeInTheDocument()
})
it('Should route back to index page from detail page', async () => {
  const { page } = await getPage({
    route: '/posts/2',
  })
  render(page)
  await screen.findByText('title2')
  userEvent.click(screen.getByText('Back'))
  expect(await screen.findByText('4NZI')).toBeInTheDocument()
})
