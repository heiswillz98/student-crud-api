import { Request, Response } from "express";
import { Student } from "../models/student";
import logger from "../utils/logger";
import { pool } from "../config/studentdb";

// Create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age, enrolled } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, email, age, enrolled) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, age, enrolled]
    );

    logger.info(`Student created: ${result.rows[0].id}`);
    res.status(201).json({
      message: "Student created successfully",
      student: result.rows[0],
    });
  } catch (error) {
    logger.error("Error creating student: " + error);
    res.status(500).json({ message: "Error Creating Student", error });
  }
};

// Get all students
export const getStudent = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    logger.info(`Fetched ${result.rows.length} student(s)`);
    res.status(200).json(result.rows);
  } catch (error) {
    logger.error("Error fetching students: " + error);
    res.status(500).json({ message: "Error Fetching Students", error });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      logger.warn(`Student not found: ${id}`);
      res.status(404).json({ message: "Student not found" });
    }

    logger.info(`Fetched student with id: ${id}`);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error(`Error fetching student by ID ${id}: ${error}`);
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age, enrolled } = req.body;

  try {
    const result = await pool.query(
      "UPDATE students SET name = $1, email = $2, age = $3, enrolled = $4 WHERE id = $5 RETURNING *",
      [name, email, age, enrolled, id]
    );

    if (result.rows.length === 0) {
      logger.warn(`Student not found for update: ${id}`);
      res.status(404).json({ message: "Student not found" });
    }

    logger.info(`Updated student: ${id}`);
    res
      .status(200)
      .json({ message: "Updated successfully", student: result.rows[0] });
  } catch (error) {
    logger.error("Error updating student: " + error);
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      logger.warn(`Student not found for deletion: ${id}`);
      res.status(404).json({ message: "Student not found" });
    }

    logger.info(`Deleted student: ${id}`);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    logger.error("Error deleting student: " + error);
    res.status(500).json({ message: "Error deleting student", error });
  }
};

// //Mongodb
// // Create student
// export const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { name, email, age, enrolled } = req.body;
//     const student = new Student({ name, email, age, enrolled });

//     await student.save();
//     logger.info(`Student created: ${student._id}`);
//     res.status(201).json({ message: "Student created successfully" });
//   } catch (error) {
//     logger.error("Error creating student: " + error);
//     res.status(500).json({ message: "Error Creating Student", error });
//   }
// };

// // Get all students
// export const getStudent = async (req: Request, res: Response) => {
//   try {
//     const students = await Student.find();
//     logger.info(`Fetched ${students.length} student(s)`);
//     res.status(200).json(students);
//   } catch (error) {
//     logger.error("Error fetching students: " + error);
//     res.status(500).json({ message: "Error Fetching Students", error });
//   }
// };

// // Get student by ID
// export const getStudentById = async (req: Request, res: Response) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       logger.warn(`Student not found: ${req.params.id}`);
//       res.status(404).json({ message: "Student Not Found" });
//     }

//     logger.info(`Fetched student: ${student?._id}`);
//     res.status(200).json(student);
//   } catch (error) {
//     logger.error("Error fetching student by ID: " + error);
//     res.status(500).json({ message: "Error fetching student", error });
//   }
// };

// // Update student
// export const updateStudent = async (req: Request, res: Response) => {
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedStudent) {
//       logger.warn(`Student not found for update: ${req.params.id}`);
//       res.status(404).json({ message: "Student not found" });
//     }

//     logger.info(`Updated student: ${updatedStudent?._id}`);
//     res.status(200).json({ message: "Updated successfully", updatedStudent });
//   } catch (error) {
//     logger.error("Error updating student: " + error);
//     res.status(500).json({ message: "Error updating student", error });
//   }
// };

// // Delete student
// export const deleteStudent = async (req: Request, res: Response) => {
//   try {
//     const deletedStudent = await Student.findByIdAndDelete(req.params.id);
//     if (!deletedStudent) {
//       logger.warn(`Student not found for deletion: ${req.params.id}`);
//       res.status(404).json({ message: "Student not found" });
//     }

//     logger.info(`Deleted student: ${deletedStudent?._id}`);
//     res.status(200).json({ message: "Successfully Deleted" });
//   } catch (error) {
//     logger.error("Error deleting student: " + error);
//     res.status(500).json({ message: "Error deleting student", error });
//   }
// };
