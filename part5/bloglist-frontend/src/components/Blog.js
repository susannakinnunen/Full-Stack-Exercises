import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setShowAll] = useState(false)
  const [view, setView] = useState(false)
  const [hideOrViewText, setHideOrViewText] = useState("view")
  const [likes, setLikes] = useState(blog.likes)

  const blog_user = blog.user
  // console.log("blog_user", blog_user)
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  const loggedUser = JSON.parse(loggedUserJSON)
  // console.log("loggedUsed", loggedUser)
  const handleshowAll =  async (event) => {
    event.preventDefault()
    console.log("näytetäänkö kaikki vai ei")
    setShowAll(!showAll)
    setView(!view)
    if (hideOrViewText === "view" ) {
      setHideOrViewText("hide")
    }
    else{
      setHideOrViewText("view")
    }
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    console.log("likes first", likes)
    setLikes(likes + 1)
    console.log("likes second", likes)
    if (blog_user) {
    const blogObject = {
      user: blog_user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    addLike(blogObject, blog.id)}
    else{
    const blogObject = {
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
      }
      addLike(blogObject, blog.id)}
  }

  const handleDelete = async (blog) => {
    deleteBlog(blog)
}

  if (showAll && blog_user.username === loggedUser.username) {
    console.log("show remove button")
    return (
      <div style={blogStyle}>
        <div> 
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>{likes}</p> <button onClick={handleLikes}>like</button>
          <p>{blog_user.username}</p>
          <button onClick={handleshowAll}>{hideOrViewText}</button>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
    </div>
  )}

  if (showAll && blog_user ) {
    return (
      <div style={blogStyle}>
        <div> 
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>{likes}</p> <button onClick={handleLikes}>like</button>
          <p>{blog_user.username}</p>
          <button onClick={handleshowAll}>{hideOrViewText}</button>
        </div>
    </div>
  )}
  if (showAll){
    return (
      <div style={blogStyle}>
        <div> 
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>{likes}</p> <button onClick={handleLikes}>like</button>
          <button onClick={handleshowAll}>{hideOrViewText}</button>
        </div>
    </div>      
    )
  }
  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author}
        <button onClick={handleshowAll}>{hideOrViewText}</button>
      </div>
  </div>
)}


export default Blog