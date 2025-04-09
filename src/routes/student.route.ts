import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    message: "Student api is running smoothly",
  });
});

router.post("/student", createStudent);
router.get("/student", getStudent);
router.get("/student/:id", getStudentById);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;
