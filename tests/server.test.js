const request = require("supertest");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const routes = require("../routes");

app
  .use(express.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ origin: "*" }))
  .use("/", routes);

// mock the GitHubStrategy
app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
      : "BookSmart API. You are logged out"
  );
});

// mock passport authentication
passport.authenticate = jest.fn(() => (req, res, next) => {
  req.user = { id: "123", username: "usertest" };
  next();
});

// mock github callback route
app.get("/github/callback", (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
});

describe("Express Server Routes", () => {
  beforeAll(() => {
    // mock passport serialization and deserialization
    passport.serializeUser = jest.fn((user, done) => done(null, user));
    passport.deserializeUser = jest.fn((user, done) => done(null, user));
  });

  describe("Index Route", () => {
    // test the index route
    test("it should return a welcome message and login status", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("BookSmart API");
    });
  });

  describe("GitHub Callback Route", () => {
    // test the github callback route
    test("it should redirect to the homepage when authenticated successfully", async () => {
      const response = await request(app).get("/github/callback");
      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe("/");
    });
  });
});
