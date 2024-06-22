# Outpass Management System

## Overview

The Outpass Management System is designed to facilitate the process where students can apply for an outpass, which will be subsequently approved or rejected by the warden or caretaker. This system will also maintain a complete record of entry and exit details, including the date, time, destination, and reason for leaving the campus. Students can log in to their accounts to check the status of their outpass applications and view their entry/exit records.

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Data Models](#data-models)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Workflow](#workflow)

## Features

1. **User Login**
   - User can log in to their accounts or register if new. User can be student or warden.

   if the user is student:

2. **Student Outpass Application**
   - Apply for an outpass with necessary details.
   - View the status of submitted applications.


if the user is warden
3. **Warden/Caretaker Approval**
   - View pending outpass applications.
   - Approve or reject outpass applications.
   can view all the approved outpasses.



## System Architecture

The system uses the MERN stack:

- **MongoDB**: Database for storing application data.
- **Express.js**: Web framework for building the backend API.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for the backend.

## Data Models

### Student

```json
{
  {
    userId: { type: String, unique: true, required: true }, // Define userId as unique and required
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'warden'] },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}

}







}

{
  {
    outpassId: { type: String, default: uuidv4, unique: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    outDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    wardenComment: { type: String }
}
}



API Endpoints
Authentication Endpoints
POST /api/auth/login
Log in a student.


Student Endpoints
POST /api/outpass/apply
Apply for a new outpass.
GET /api/outpass/status/:studentId
Get status of all applications by a student.
GET /api/records/:studentId
Get entry/exit records for a specific student.


Warden/Caretaker Endpoints
GET /api/outpass/pending
Get all pending outpass applications.
POST /api/outpass/approve/:applicationId
Approve an outpass application.
POST /api/outpass/reject/:applicationId
Reject an outpass application.


Record Maintenance Endpoints
GET /api/records
Get all entry/exit records.


Frontend Components

Authentication Components
LoginForm: Form for students to log in.
Student Components
ApplyOutpassForm: Form for students to apply for an outpass.
OutpassStatus: Page to view the status of outpass applications.
StudentRecords: Page to view entry and exit records for a specific student.
Warden/Caretaker Components
PendingOutpasses: Page to view and manage pending outpass applications.
OutpassApprovalForm: Form to approve or reject an outpass application.


Record Components
EntryExitRecords: Page to view all entry and exit records.



Workflow
User Register/Login

The User logs in to their account .
Upon successful login, the user is redirected to their dashboard.

if the user is a student:
Student Application

The student fills out the outpass application form and submits it.
The application is stored in the database with a status of "Pending".
the student can view the status of the outpass.

if the user is warden


The warden views pending applications.
The warden can approve or reject an application.
The status of the application is updated accordingly in the database.
the warden can view all the approved outpass record.

All records are maintained in the database and can be viewed by authorized personnel.
