import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm adds blog with correct values', async () => {
  const user = userEvent.setup()
  const createBlog= jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')

  const createButton = screen.getByText('create')

  await user.type(title, 'Testing is fun')
  await user.type(author, 'Taina Testaaja')
  await user.type(url, 'www.testing.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls[0][0].author).toBe('Taina Testaaja')
  expect(createBlog.mock.calls[0][0].title).toBe('Testing is fun')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.fi')
})