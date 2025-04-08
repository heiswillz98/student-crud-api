import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller";

const router = Router();

router.post("/", createStudent);
router.get("/", getStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
