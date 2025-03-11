const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const api = supertest(app);

const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

//test that verifies the blog post application returns blog posts in JSON format.
test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//testing for correct amount of blog post
test("blog list application returns the correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");
  // console.log("Total blogs returned:", response.body.length);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

//testing for unique identifier property of the blog posts is named id.
test("blog posts have an id property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert.notStrictEqual(blog.id, undefined);
  });
});

//a test that verifies that making an HTTP POST request creates a new blog post.
test("a blog can be added", async () => {
  const newBlog = {
    title: "testing blog",
    author: "Tester",
    url: "https://testing.com/newblog",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(titles.includes("testing blog"));
});

//a test that verifies that if the likes property is missing from the request, it will default to the value 0.
test("if likes property missing, it defaults to value 0", async () => {
  const newBlog = {
    title: "testing no likes",
    author: "NoLikes",
    url: "https://testingnolikes.com",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(201);
  assert.strictEqual(response.body.likes, 0);
  // console.log(response.body.likes);
});

//testing for missing title, blog is not added
test("if title missing, the blog is not added and responds with 400 status", async () => {
  const newBlog = {
    author: "Mary",
    url: "https://mary.com",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

//testing for missing url
test("if url missing, the blog is not added and responds with 400 status", async () => {
  const newBlog = {
    author: "Mary",
    title: "Testing No URL",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

//testing for deleting a single blog post resource
test("a blog can be deleted", async () => {
  const blogAtStart = await helper.blogInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogInDb();

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(!titles.includes(blogToDelete.title));

  assert.strictEqual(blogsAtEnd.length, blogAtStart.length - 1);
});

after(() => {
  mongoose.connection.close();
});
