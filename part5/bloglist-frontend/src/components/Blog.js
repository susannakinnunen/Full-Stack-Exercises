import { useState } from 'react'

const Blog = ({ blog }) => {
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

  const user = blog.user
  
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

  if (showAll && user ) {
    return (
      <div style={blogStyle}>
        <div> 
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{user.username}</p>
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
          <p>{blog.likes}</p>
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