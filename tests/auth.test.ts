import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";


// Mock jwt.verify
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({
    userId: "test-user-id",
    username: "testuser",
    iss: "test-issuer",
    jti: "test-jti"
  }))
}));

// Mock prisma
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      $connect: jest.fn().mockResolvedValue(undefined),
      $disconnect: jest.fn().mockResolvedValue(undefined),
      blacklist: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn()
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: "test-user-id",
          name: "Test User",
          username: "testuser"
        })
      }
    }))
  };
});

// Force close Prisma connections after tests
afterAll(async () => {
  const prisma = new PrismaClient();
  await prisma.$disconnect();
});

describe("Auth Middleware and Dummy Endpoint", () => {
  it("should return 401 if no token provided", async () => {
    const res = await request(app).post("/api/v1/auth/dummy");
    expect(res.statusCode).toBe(401);
  });

  it("should return 200 with valid token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/dummy")
      .set("Authorization", "Bearer valid.token.here");
    expect(res.statusCode).toBe(200);
  });
});
