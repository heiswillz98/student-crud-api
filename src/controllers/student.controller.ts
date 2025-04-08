import { Request, Response } from "express";
import { Student } from "../models/student";

// create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age, enrolled } = req.body;

    const student = new Student({ name, email, age, enrolled });

    await student.save();
    res.status(201).json({ message: "Student created succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Creating Student", error });
  }
};

//Get all student
export const getStudent = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Student", error });
    console.log(error);
  }
};

//Get student by id
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student Not Found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(501).json({ message: "Error fetching student", error });
  }
};

//Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateStudent) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Updated sucessfully", updateStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

//Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Sucessfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
