const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test.only("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("blog list application returns the correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");
  console.log("Total blogs returned:", response.body.length);
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test.only("blog posts have an id property", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert.notStrictEqual(blog.id, undefined);
  });
});

after(() => {
  mongoose.connection.close();
});
