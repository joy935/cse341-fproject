const request = require("supertest");
const express = require("express");
const router = require("../routes/users");
const usersController = require("../controllers/users");

// mock the users controller
jest.mock("../controllers/users");
// mock the isAuthenticated middleware
jest.mock("../middleware/authenticate", () => ({
    isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use("/users", router);

describe("users routes", () => {
    describe("GET /users", () => {
        // test for happy path
        test("it should return all users", async () => {
            const mockusers = [
                {
                    _id: "1",
                    firstName: "Carlos",
                    lastName: "Peres",
                    email: "carlos@email.com",
                    address: "123 Cash St, Selvy, ST 3321"
                },
                {
                    _id: "2",
                    firstName: "John",
                    lastName: "Jordan",
                    email: "jj@email.com",
                    address: "705 Terrarosa, MG, ST 3321"
                },

            ];
            usersController.getAll.mockImplementation((req, res) => {
                res.status(200).json(mockusers);
            });

            const response = await request(app).get("/users");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockusers);
        });

        // test for empty database response
        test("it should return an empty array when no users exist", async () => {
            usersController.getAll.mockImplementation((req, res) => {
                res.status(200).json([]);
            });

            const response = await request(app).get("/users");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});

describe("GET /users/:id", () => {
    // test for happy path
    test("it should return a specific user", async () => {
        const mockuser = {
            _id: "1",
            firstName: "Carlos",
            lastName: "Peres",
            email: "carlos@email.com",
            address: "123 Cash St, Selvy, ST 3321"
        };
        usersController.getSingle.mockImplementation((req, res) => {
            res.status(200).json(mockuser);
        });

        const response = await request(app).get("/users/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockuser);
    });

    // test for invalid id
    test("it should return an error message for an invalid id", async () => {
        usersController.getSingle.mockImplementation((req, res) => {
            res.status(400).json({ message: "Must use a valid user id to find an user." });
        });

        const response = await request(app).get("/users/invalid-id");
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: "Must use a valid user id to find an user." });
    });
});
