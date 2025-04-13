import { Request, Response } from "express";
import { Student } from "../models/student";
import logger from "../utils/logger";

// Create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age, enrolled } = req.body;
    const student = new Student({ name, email, age, enrolled });

    await student.save();
    logger.info(`Student created: ${student._id}`);
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    logger.error("Error creating student: " + error);
    res.status(500).json({ message: "Error Creating Student", error });
  }
};

// Get all students
export const getStudent = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    logger.info(`Fetched ${students.length} student(s)`);
    res.status(200).json(students);
  } catch (error) {
    logger.error("Error fetching students: " + error);
    res.status(500).json({ message: "Error Fetching Students", error });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      logger.warn(`Student not found: ${req.params.id}`);
      return res.status(404).json({ message: "Student Not Found" });
    }

    logger.info(`Fetched student: ${student._id}`);
    res.status(200).json(student);
  } catch (error) {
    logger.error("Error fetching student by ID: " + error);
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      logger.warn(`Student not found for update: ${req.params.id}`);
      return res.status(404).json({ message: "Student not found" });
    }

    logger.info(`Updated student: ${updatedStudent._id}`);
    res.status(200).json({ message: "Updated successfully", updatedStudent });
  } catch (error) {
    logger.error("Error updating student: " + error);
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      logger.warn(`Student not found for deletion: ${req.params.id}`);
      return res.status(404).json({ message: "Student not found" });
    }

    logger.info(`Deleted student: ${deletedStudent._id}`);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    logger.error("Error deleting student: " + error);
    res.status(500).json({ message: "Error deleting student", error });
  }
};
