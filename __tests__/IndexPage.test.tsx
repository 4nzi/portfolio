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

const server = setupServer(
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
  )
)
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
describe('IndexPage Test Cases', () => {
  it('Should route to login page and route back to index page', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    userEvent.click(screen.getByText('admin'))
    expect(await screen.findByText('Login')).toBeInTheDocument()
    userEvent.click(screen.getByText('Back to site'))
    expect(await screen.findByText('4NZI')).toBeInTheDocument()
  })
})
it('Should render the list of posts pre-fetched by getStaticProps', async () => {
  const { page } = await getPage({
    route: '/',
  })
  render(page)
  expect(await screen.findByText('4NZI')).toBeInTheDocument()
  expect(screen.getByText('title1')).toBeInTheDocument()
  expect(screen.getByText('title2')).toBeInTheDocument()
})
