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
  const authorsAndLikes = blogs.map(({author, likes}) =>
  ({author, likes}))

  //console.log("authorsAndLikes", authorsAndLikes)

  //tehdään objekti tai lista, missä objekteina vain jokainen kirjailija
  //vain kerran ja heidän yhteen laskettu tykkäysten määrä
  // jos listassa on jo author, niin silloin vain lisätään likes yhteen

  const authorsWithTotalLikes = authorsAndLikes.reduce((object, { author, likes }) => {
    if (!object[author]) {
      object[author] = likes
    } else {
      object[author] += likes
    }
    return object
  }, {})

  console.log(authorsWithTotalLikes)
  const authorWithMostLikes = Object.entries(authorsWithTotalLikes).reduce((mostLikes, [author, likes]) => {
    if (likes > mostLikes.likes) {
        return {author, likes }
    } else {
        return mostLikes
    }
   }, {author: null, likes: -Infinity}
  )
  console.log("authorwithmostlikes",authorWithMostLikes)

  return authorWithMostLikes


}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    authorWithMostBlogs,
    authorWithMostLikes
  }