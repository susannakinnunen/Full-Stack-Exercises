import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    likes: 1,
    author: 'Taina Testaaja',
    title: 'Testing is fun',
    url: 'www.testaus.fi' }

  const mockAddLike = jest.fn()
  const mockDeleteBlog = jest.fn()

  render(<Blog blog={blog} addLike={mockAddLike} deleteBlog={mockDeleteBlog} />)

  const element = screen.getByText('Testing is fun Taina Testaaja')
  screen.debug(element)
  expect(element).toBeDefined()
})