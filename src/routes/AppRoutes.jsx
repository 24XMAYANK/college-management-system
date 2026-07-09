import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

// ================= ADMIN =================

import AdminDashboard from "../pages/admin/Dashboard";

import Students from "../pages/admin/Students";
import AddStudent from "../pages/admin/AddStudent";
import EditStudent from "../pages/admin/EditStudent";

import Teachers from "../pages/admin/Teachers";
import AddTeacher from "../pages/admin/AddTeacher";
import EditTeacher from "../pages/admin/EditTeacher";

import Courses from "../pages/admin/Courses";
import AddCourse from "../pages/admin/AddCourse";
import EditCourse from "../pages/admin/EditCourse";

// ================= TEACHER =================

import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherStudents from "../pages/teacher/Students";
import TeacherAttendance from "../pages/teacher/Attendance";
import TeacherMarks from "../pages/teacher/Marks";
import TeacherProfile from "../pages/teacher/Profile";

// ================= STUDENT =================

import StudentDashboard from "../pages/student/Dashboard";
import StudentCourses from "../pages/student/Courses";
import StudentAttendance from "../pages/student/Attendance";
import StudentMarks from "../pages/student/Marks";
import StudentProfile from "../pages/student/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-student"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-student/:id"
          element={
            <ProtectedRoute role="admin">
              <EditStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute role="admin">
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-teacher"
          element={
            <ProtectedRoute role="admin">
              <AddTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-teacher/:id"
          element={
            <ProtectedRoute role="admin">
              <EditTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-course"
          element={
            <ProtectedRoute role="admin">
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-course/:id"
          element={
            <ProtectedRoute role="admin">
              <EditCourse />
            </ProtectedRoute>
          }
        />

        {/* ================= TEACHER ================= */}

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute role="teacher">
              <TeacherStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute role="teacher">
              <TeacherAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/marks"
          element={
            <ProtectedRoute role="teacher">
              <TeacherMarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/profile"
          element={
            <ProtectedRoute role="teacher">
              <TeacherProfile />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/courses"
          element={
            <ProtectedRoute role="student">
              <StudentCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute role="student">
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/marks"
          element={
            <ProtectedRoute role="student">
              <StudentMarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;