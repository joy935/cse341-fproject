const request = require("supertest");
const express = require("express");
const router = require("../routes/books");
const booksController = require("../controllers/books");

// mock the orders controller
jest.mock("../controllers/books");
// mock the isAuthenticated middleware
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use("/books", router);

describe("Books routes", () => {
  describe("GET /books", () => {
    // test for happy path
    test("it should return all books", async () => {
      const mockBooks = [
        {
          _id: "1",
          title: "I am Malala",
          author: "Malala Yousafzai",
          categoryCode: "11",
          description: "The Story of the Girl Who Stood Up for Education and Was Shot by the Taliban",
          isbn: "9780316322409",
          price: 10,
          publisher: "Little, Brown and Company"
        },
        {
          _id: "2",
          title: "The Alchemist",
          author: "Paulo Coelho",
          categoryCode: "22",
          description: "A Novel about Following Your Dream",
          isbn: "9780062315007",
          price: 20,
          publisher: "HarperOne"
        },
      ];
        booksController.getBooks.mockImplementation((req, res) => {
            res.status(200).json(mockBooks);
        });

        const response = await request(app).get("/books");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockBooks);
    });

    // test for empty database response
    test("it should return an empty array when no books exist", async () => {
        booksController.getBooks.mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get("/books");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
  });
});

describe("GET /books/:id", () => {
    // test for happy path
    test("it should return a book by id", async () => {
        const mockBook = {
        _id: "1",
        title: "I am Malala",
        author: "Malala Yousafzai",
        categoryCode: "11",
        description: "The Story of the Girl Who Stood Up for Education and Was Shot by the Taliban",
        isbn: "9780316322409",
        price: 10,
        publisher: "Little, Brown and Company"
        };
        booksController.getBook.mockImplementation((req, res) => {
            res.status(200).json(mockBook);
        });

        const response = await request(app).get("/books/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockBook);
    });

    // test for invalid id
    test("it should return a 400 error for invalid id", async () => {
        booksController.getBook.mockImplementation((req, res) => {
            res.status(400).json({ message: "Must use a valid book id to find a book." });
        });

        const response = await request(app).get("/books/abc");
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: "Must use a valid book id to find a book." });
    });
});
