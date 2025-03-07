const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "blog 1",
    author: "harry",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
  },
  {
    title: "blog 2",
    author: "pete",
    url: "https://reactpatterns.com/",
    likes: 9,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogInDb,
};
