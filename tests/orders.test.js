const request = require("supertest");
const express = require("express");
const router = require("../routes/orders");
const ordersController = require("../controllers/orders");

// mock the orders controller
jest.mock("../controllers/orders");
// mock the isAuthenticated middleware
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use("/orders", router);

describe("Orders routes", () => {
  describe("GET /orders", () => {
    // test for happy path
    test("it should return all orders", async () => {
      const mockOrders = [
        {
          _id: "1",
          customerId: "1",
          date: "2024-09-01",
          total: 100,
          bookId: "1",  
          status: "Pending",
        },
        {
          _id: "2",
          customerId: "2",
          date: "2024-09-02",
          total: 200,
          bookId: "2",
          status: "Completed",
        },
      ];
      ordersController.getOrders.mockImplementation((req, res) => {
        res.status(200).json(mockOrders);
      });

      const response = await request(app).get("/orders");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockOrders);
    });

    // test for empty database response
    test("it should return an empty array when no orders exist", async () => {
      ordersController.getOrders.mockImplementation((req, res) => {
        res.status(200).json([]);
      });

      const response = await request(app).get("/orders");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});

describe("GET /orders/:id", () => {
  // test for happy path
  test("it should return a specific order", async () => {
    const mockOrder = {
      _id: "1",
      customerId: "1",
      date: "2024-09-01",
      total: 100,
      bookId: "1",
      status: "Pending",
    };
    ordersController.getOrder.mockImplementation((req, res) => {
      res.status(200).json(mockOrder);
    });

    const response = await request(app).get("/orders/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  // test for order not found
  test("it should return an error message for an invalid id", async () => {
    ordersController.getOrder.mockImplementation((req, res) => {
      res.status(400).json({ message: "Must use a valid order id to find an order." });
    });

    const response = await request(app).get("/orders/invalid-id");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Must use a valid order id to find an order." });
  });
});
