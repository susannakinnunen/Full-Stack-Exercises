import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {

  beforeEach(() => {
    const blog = {
      likes: 1,
      author: 'Taina Testaaja',
      title: 'Testing is fun',
      url: 'www.testaus.fi' }

    const mockAddLike = jest.fn()
    const mockDeleteBlog = jest.fn()

    render(<Blog blog={blog} addLike={mockAddLike} deleteBlog={mockDeleteBlog} />)

  })

  test('renders content', () => {
    const element = screen.getByText('Testing is fun Taina Testaaja')
    const url = screen.queryByText('www.testaus.fi')
    const likes = screen.queryByText('1')
    screen.debug(element)
    expect(element).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders content when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const titleAndAuthor = screen.getByText('Testing is fun Taina Testaaja')
    const url = screen.getByText('www.testaus.fi')
    const likes = screen.getByText('1')
    expect(titleAndAuthor).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })

})