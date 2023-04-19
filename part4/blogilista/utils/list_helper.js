const _  = require('lodash')

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

const authorWithMostBlogs = (blogs) => {
    const authors = blogs.map(blog =>
        blog.author)

    const theAuthor = authors.reduce((author_one,author_two,i,array) =>
    array.filter(author=>author===author_one).length>=array.filter(author=>author===author_two).length ? author_one:author_two, null)

    const amount = authors.filter(author => author===theAuthor).length
    
    const result = {
        author: theAuthor,
        blogs: amount
    }

    return result
}

const authorWithMostLikes = (blogs) => {
    const authorsAndLikes = _.chain(blogs, likes)
    console.log("authorsandlikes",authorsAndLikes)
    return authorsAndLikes
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    authorWithMostBlogs,
    authorWithMostLikes
  }