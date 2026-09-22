CODING SAMURAI INTERNSHIP TASK
This repository contains the projects completed during my Java
Developer Internship at Coding Samurai.
The projects were developed to strengthen practical skills in Java,
Spring Boot, REST APIs, React, MySQL, JPA/Hibernate, and Git/GitHub.
---
👨‍💻 Internship Details
Organization: Coding Samurai
Role: Java Developer Intern
Program: 4-Week Internship
Developer: Mohan Kumar
---
📂 Projects
1. Library Management System
A full-stack library management application developed with a Java/Spring
Boot backend and React frontend.
Project structure:
``` text
library management system backend/
library-frontend/
```
Technology stack:
Java
Spring Boot
Spring Data JPA
Hibernate
MySQL
REST APIs
React
Git & GitHub
Main purpose:
The application provides a digital system for managing library-related
operations through a web-based frontend and RESTful backend.
---
2. Online Quiz Application
A full-stack online quiz application developed with a Java/Spring Boot
backend and React frontend.
Project structure:
``` text
quiz-backend/
quiz-frontend/
```
Technology stack:
Java
Spring Boot
Spring Data JPA
Hibernate
MySQL
REST APIs
React
Git & GitHub
Main purpose:
The application provides a web-based platform for conducting quizzes and
processing quiz-related data through a Spring Boot REST API and React
frontend.
---
🏗️ General Architecture
Both projects follow a full-stack architecture:
``` text
┌──────────────────────────┐
│      React Frontend      │
│        UI / Client       │
└────────────┬─────────────┘
             │
             │ HTTP / REST API
             ▼
┌──────────────────────────┐
│     Spring Boot API      │
│                          │
│       Controller         │
│           ↓              │
│        Service           │
│           ↓              │
│       Repository         │
└────────────┬─────────────┘
             │
             │ JPA / Hibernate
             ▼
┌──────────────────────────┐
│          MySQL           │
│         Database         │
└──────────────────────────┘
```
---
🛠️ Technologies Used
Technology        Purpose
---
Java              Backend development
Spring Boot       REST API and application development
Spring Data JPA   Database access
Hibernate         ORM
MySQL             Relational database
React             Frontend development
REST API          Frontend-backend communication
Git               Version control
GitHub            Source code hosting
Postman           API testing
---
📁 Repository Structure
``` text
CODING-SAMURAI-INTERNSHIP-TASK/
│
├── library management system backend/
│   └── Spring Boot backend
│
├── library-frontend/
│   └── React frontend
│
├── quiz-backend/
│   └── Spring Boot backend
│
├── quiz-frontend/
│   └── React frontend
│
├── .gitignore
└── README.md
```
---
⚙️ General Setup
Prerequisites
Make sure the following are installed:
Java JDK
Maven
MySQL Server
Node.js and npm
Git
A code editor/IDE such as IntelliJ IDEA, Eclipse, STS, or VS Code
Backend
Open the required backend project.
Configure the MySQL database connection in `application.properties`
or `application.yml`.
Create the required database in MySQL.
Start the Spring Boot application.
Verify the REST APIs using Postman.
Frontend
Open the corresponding frontend folder.
Install dependencies:
``` bash
npm install
```
Start the React development server:
``` bash
npm run dev
```
Open the local URL shown by Vite in the browser.
> Database names, ports, usernames, passwords, and API URLs should be
> configured according to the local development environment. Do not
> commit real passwords or other sensitive credentials to GitHub.
---
🔌 Backend-Frontend Communication
The React applications communicate with their Spring Boot backends
through REST APIs.
``` text
User
  ↓
React UI
  ↓
HTTP Request
  ↓
Spring Boot REST Controller
  ↓
Service Layer
  ↓
JPA Repository
  ↓
MySQL
  ↓
HTTP Response
  ↓
React UI
```
---
🧪 Testing
The backend REST APIs can be tested using Postman.
Testing includes checking:
API requests and responses
CRUD operations
Request validation
Database persistence
Error handling
Frontend-backend integration
---
## 📸 Project Screenshots

### Library Management System

#### Dashboard
![Library Dashboard](screenshots/library-dashboard.png)

#### Members
![Library Members](screenshots/library-members.png)

#### Books
![Library Books](screenshots/library-books.png)

#### Circulation
![Library Circulation](screenshots/library-circulation.png)

---

### Online Quiz Application

#### Home
![Quiz Home](screenshots/quiz-home.png)

#### Quiz Selection
![Quiz Selection](screenshots/quiz-selection.png)

#### Quiz
![Quiz Question](screenshots/quiz-question.png)

#### Results
![Quiz Result](screenshots/quiz-result.png)

📌 Learning Outcomes
Through these projects, I gained practical experience with:
Object-Oriented Programming in Java
Spring Boot application development
REST API development
Layered backend architecture
JPA/Hibernate
MySQL database integration
React frontend development
Frontend-backend integration
API testing
Git and GitHub
Debugging and problem solving
---
🚀 Future Improvements
Possible future enhancements include:
Improved authentication and authorization
Additional validation and error handling
Responsive UI improvements
Automated testing
Deployment to a cloud platform
Additional application features
---
📜 Internship
These projects were completed as part of my Java Developer Internship
at Coding Samurai.
The purpose of this repository is to document the practical projects and
technical skills developed during the internship.
---
👤 Author
Mohan Kumar
Java Developer | MCA Graduate
GitHub: MohanKumar-04
---
⭐ If you find this repository useful, feel free to explore the projects
and their source code.
