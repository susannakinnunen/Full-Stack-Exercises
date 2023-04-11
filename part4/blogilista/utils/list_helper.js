const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (maxLikes, blog) => {
        if ( blog.likes > maxLikes) {
            maxLikes = blog.likes 
            return maxLikes
        } else {
            return maxLikes
        }
    }

    const maxLikes = blogs.reduce(reducer, 0)
    const favBlog = blogs.filter(blog => blog.likes === maxLikes)

    const result = {
        title: favBlog[0].title,
        author: favBlog[0].author,
        likes: favBlog[0].likes
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }