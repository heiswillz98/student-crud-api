// tests/api/v1/student.controller.test.ts
import request from "supertest";
import app from "../index";
import { pool } from "../config/studentdb";

jest.mock("../config/studentdb", () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockedPool = pool as unknown as {
  query: jest.Mock;
};

it("should create a student", async () => {
  const fakeStudent = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 22,
    enrolled: true,
  };

  mockedPool.query.mockResolvedValueOnce({ rows: [fakeStudent] } as any);

  const res = await request(app).post("/api/v1/student").send(fakeStudent);

  expect(res.status).toBe(201);
  expect(res.body.message).toBe("Student created successfully");
  expect(res.body.student).toEqual(fakeStudent);
});

it("should fetch all students", async () => {
  const fakeStudents = [
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      age: 20,
      enrolled: true,
    },
    {
      id: 2,
      name: "Jane",
      email: "jane@example.com",
      age: 22,
      enrolled: false,
    },
  ];

  mockedPool.query.mockResolvedValueOnce({ rows: fakeStudents } as any);

  const res = await request(app).get("/api/v1/student");

  expect(res.status).toBe(200);
  expect(res.body).toEqual(fakeStudents);
});

it("should fetch student by ID", async () => {
  const studentId = "1";
  const fakeStudent = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 20,
    enrolled: true,
  };

  mockedPool.query.mockResolvedValueOnce({ rows: [fakeStudent] } as any);

  const res = await request(app).get(`/api/v1/student/${studentId}`);

  expect(res.status).toBe(200);
  expect(res.body).toEqual(fakeStudent);
});

it("should return 404 if student not found by ID", async () => {
  mockedPool.query.mockResolvedValueOnce({ rows: [] } as any);

  const res = await request(app).get("/api/v1/student/999");

  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Student not found");
});

it("should update student", async () => {
  const studentId = "1";
  const updatedStudent = {
    id: 1,
    name: "Updated John",
    email: "john@example.com",
    age: 25,
    enrolled: false,
  };

  mockedPool.query.mockResolvedValueOnce({ rows: [updatedStudent] } as any);

  const res = await request(app)
    .put(`/api/v1/student/${studentId}`)
    .send(updatedStudent);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Updated successfully");
  expect(res.body.student).toEqual(updatedStudent);
});

it("should return 404 if student not found for update", async () => {
  mockedPool.query.mockResolvedValueOnce({ rows: [] } as any);

  const res = await request(app).put("/api/v1/student/999").send({
    name: "Ghost",
    email: "ghost@example.com",
    age: 0,
    enrolled: false,
  });

  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Student not found");
});

it("should delete student", async () => {
  mockedPool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] } as any);

  const res = await request(app).delete("/api/v1/student/1");

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Successfully Deleted");
});

it("should return 404 if student not found for deletion", async () => {
  mockedPool.query.mockResolvedValueOnce({ rows: [] } as any);

  const res = await request(app).delete("/api/v1/student/999");

  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Student not found");
});
