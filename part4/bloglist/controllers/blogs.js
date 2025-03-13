const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//get all blogs
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

//post a blog
blogsRouter.post("/", (request, response) => {
  const { title, author, url, likes } = request.body;

  if (title === undefined || url == undefined) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

//delete a blog
blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "no blog found" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

//update a blog
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

module.exports = blogsRouter;
