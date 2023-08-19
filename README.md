# Student Result Management System

## Description

The Student Result Management System is a comprehensive database management system designed for managing student results, courses, subjects, teachers, and administrators. The system aims to provide an efficient and user-friendly platform for admin to manage and access academic information.

## Entities and Attributes

### Student
- S_id (Student ID)
- First_Name
- Last_Name
- DOB (Date of Birth)
- Batch_Name

### Teacher
- T_id (Teacher ID)
- C_No
- Name

### Result
- C_No
- Roll_No
- MTexam_Date
- MTexam_Marks
- Finalexam_Date
- Finalexam_Marks
- Total

### Course
- C_id (Course ID)
- C_Name (Course Name)

### Subject
- Sub_Code (Subject Code)
- Sub_Name (Subject Name)
- Semester

### User
- User_id
- User_Name

### Non Teaching Staff
- Emp_Id
- Type
  
## Relations

- Each User is a Student, Teacher, or Admin.
- Any Admin can manage (add/delete/update) all student results and student records, including course management.
- Each Course can have multiple subjects.
- Any Teacher can modify (update marks) all student results.
- One Teacher is assigned to one Subject.
- Each Student can take multiple Subjects.
- Each Student can register for only one Course.
- Students can only view their own Result.

## Project Scope

The Student Result Management System allows admin to efficiently manage academic data, including student information, teacher assignments, course details, subject information, and result records.

The database design and relationships enable efficient data management, including result calculations, pass/fail determinations. The project's scope covers user authentication, data entry, data modification, and data retrieval while adhering to proper access controls for security.

