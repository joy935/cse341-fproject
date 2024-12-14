const request = require("supertest");
const express = require("express");
const router = require("../routes/categories"); // Adjust this path if needed
const categoriesController = require("../controllers/categories");

// Mock the categories controller
jest.mock("../controllers/categories");

// Mock the isAuthenticated middleware
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use("/categories", router);

describe("Categories routes", () => {
  describe("GET /categories", () => {
    // Test for fetching all categories
    test("it should return all categories", async () => {
      const mockCategories = [
        {
          _id: "67532cc514b203cba734c486",
          categoryName: "Historical",
          categoryCode: "HIS008",
        },
        {
          _id: "67532cc514b203cba734c489",
          categoryName: "Thriller",
          categoryCode: "THR006",
        },
      ];

      categoriesController.getAllCategories.mockImplementation((req, res) => {
        res.status(200).json(mockCategories);
      });

      const response = await request(app).get("/categories");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCategories);
    });

    // Test for empty categories
    test("it should return an empty array when no categories exist", async () => {
      categoriesController.getAllCategories.mockImplementation((req, res) => {
        res.status(200).json([]);
      });

      const response = await request(app).get("/categories");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /categories/:id", () => {
    // Test for fetching a single category
    test("it should return a specific category", async () => {
      const mockCategory = {
        _id: "67532cc514b203cba734c486",
        categoryName: "Historical",
        categoryCode: "HIS008",
      };

      categoriesController.getSingleCategory.mockImplementation((req, res) => {
        res.status(200).json(mockCategory);
      });

      const response = await request(app).get("/categories/67532cc514b203cba734c486");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCategory);
    });

    // Test for invalid ID
    test("it should return an error message for an invalid ID", async () => {
      categoriesController.getSingleCategory.mockImplementation((req, res) => {
        res.status(400).json({ message: "Must use a valid ID to find a category." });
      });

      const response = await request(app).get("/categories/invalid-id");
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ message: "Must use a valid ID to find a category." });
    });

    // Test for non-existent category
    test("it should return a 404 error when the category does not exist", async () => {
      categoriesController.getSingleCategory.mockImplementation((req, res) => {
        res.status(404).json({ message: "Category not found" });
      });

      const response = await request(app).get("/categories/67532cc514b203cba734c999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: "Category not found" });
    });
  });
});
