const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((accFav, currentBlog) =>
    currentBlog.likes > accFav.likes ? currentBlog : accFav
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const groupByAuthor = _.groupBy(blogs, "author");

  const authorBlogCounts = _.map(groupByAuthor, (blogs, author) => ({
    author: author,
    blogs: blogs.length,
  }));

  const topAuthorBlogs = _.maxBy(authorBlogCounts, "blogs");
  return topAuthorBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
