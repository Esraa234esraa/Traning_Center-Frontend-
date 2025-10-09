// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Loading from "./Components/Loading";
import { RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import MainPage from './Components/MainPage';
import ScrollToTop from './Components/ScrollToTop';
import Result from './Pages/Result';
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard_layout';
import Login from './Components/Dashboard/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import 'flowbite';
import 'flowbite-react';
import Exam from './Pages/Exam';
import Booking from './Components/Booking';
import { ToastContainer } from "react-toastify";
import Roles from './Components/Roles';
import NotFoundPage from './Components/NotFoundPage';
import Home from './Components/Dashboard/DBHome';
import AddAdmin from './Components/Dashboard/Admin/Add_Admin';
import Dashboard_layout from './Components/Dashboard/Dashboard_layout';
import ChangeAdminPassword from './Components/Dashboard/Admin/ChangeAdminPassword';
import EditAdminPage from './Components/Dashboard/Admin/EditAdminPage';
import AdminsTable from './Components/Dashboard/Admin/AdminsTable';
import Teachers_Table from './Components/Dashboard/Teacher/Teachers_Table';
import AddTeacher from './Components/Dashboard/Teacher/AddTeacher';
import EditTeacher from './Components/Dashboard/Teacher/EditTeacher';
import TeacherSessions from './Components/Dashboard/Teacher/TeacherSessions';
import EditSession from './Components/Dashboard/Teacher/EditSession';
import TeacherStudentsTable from './Components/Dashboard/Teacher/TeacherStudentsTable';
import SessionStudents from './Components/Dashboard/Teacher/SessionStudents';
import TeacherStudents from './Components/Dashboard/Teacher/SessionStudents';
import DailyySession from './Components/Dashboard/Teacher/DailySession';
import NewStudents from './Components/Dashboard/Students/NewStudent/NewStudents';
import AddNewStudent from './Components/Dashboard/Students/NewStudent/AddNewStudent';
import WaitingStudentsTable from './Components/Dashboard/Students/WaitingStudent/WaitingStudentsTable';
import AddToSessionForm from './Components/Dashboard/Students/WaitingStudent/AddToSessionForm';
import CurrentStudentsTable from './Components/Dashboard/Students/CurrentStudents/CurrentStudentsTable';
import CoursesTable from './Components/Dashboard/Courses/CoursesTable';
import AddCourse from './Components/Dashboard/Courses/AddCourse';
import EditCourse from './Components/Dashboard/Courses/EditCourse';
import ActivitiesTable from './Components/Dashboard/Activities/ActivitiesTable';
import AddActivity from './Components/Dashboard/Activities/AddActivity';
import EditActivity from './Components/Dashboard/Activities/EditActivity';
import StudentProfile from './Components/Dashboard/Students/StudentProfile';
import ReviewsTable from './Components/Dashboard/Reviews/ReviewsTable';
import Questioncontrol from './Components/Dashboard/Exam/QuestionControl';
import ResultSettings from './Components/Dashboard/Exam/ResultSettings';
import LevelsTable from './Components/Dashboard/Levels/LevelsTable';
import AddLevel from './Components/Dashboard/Levels/AddLevel';
import EditLevel from './Components/Dashboard/Levels/EditLevel';
import BouquetsTable from './Components/Dashboard/Bouquets/BouquetsTable';
import AddBouquet from './Components/Dashboard/Bouquets/AddBouquet';
import EditBouquet from './Components/Dashboard/Bouquets/EditBouquet';
import ClassesTable from './Components/Dashboard/Classes/ClassesTable';
import AddClass from './Components/Dashboard/Classes/AddClass';
import AddCurrentStudentForm from './Components/Dashboard/Students/CurrentStudents/AddCurrentStudentForm';
import EditCurrentStudentForm from './Components/Dashboard/Students/CurrentStudents/EditCurrentStudentForm';
import AddTeacherToClass from './Components/Dashboard/Teacher/AddTeacherToClass';
import UnAuthorized from './Components/Unauthorized';
import ExternalCoursesTable from './Components/Dashboard/ExternalCourses/ExternalCoursesTable';
import AddExternalCourse from './Components/Dashboard/ExternalCourses/AddExternalCourse';
import EditExternalCourse from './Components/Dashboard/ExternalCourses/EditExternalCourse';
import NotesTable from './Components/Dashboard/Notes/NotesTable';
import AddNote from './Components/Dashboard/Notes/AddNote';



function App() {


  return (
    <>
      <AuthProvider>

        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path='roles' element={<Roles />} />
              <Route path='exam' element={<Exam />} />
              <Route path='result' element={<Result />} />
              <Route path='loading' element={<Loading />} />
              <Route path='booking' element={<Booking />} />
              <Route path='roles' element={<Booking />} />
              <Route path="/login" element={<Login />} />

            </Route>
            <Route path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <Dashboard_layout />
                </ProtectedRoute>
              }>
              <Route
                path="/dashboard" element={<Home />} />
              <Route path="dbhome" element={<Home />} />
              <Route path="add-admin" element={<AddAdmin />} />
              <Route path="admins/edit-admin/:id" element={<EditAdminPage />} />
              <Route path="admins_table" element={<AdminsTable />} />
              <Route path="admins/change-password/:id" element={<ChangeAdminPassword />} />
              <Route path='teacher_table' element={<Teachers_Table />}> </Route>
              <Route path='add-teacher' element={<AddTeacher />}></Route>
              <Route path='add-teacherToClass' element={<AddTeacherToClass />}></Route>

              <Route path="edit-teacher/:id" element={<EditTeacher />} />
              <Route path="teacher-sessions/:teacherId/:teacherName" element={<TeacherSessions />} />
              <Route
                path="/dashboard/edit-session/:teacherId/:teacherName/:sessionId"
                element={<EditSession />}
              />
              <Route
                path="/dashboard/session-students/:teacherId/:teacherName/:sessionId"
                element={<SessionStudents />}
              />
              <Route path="teacher-students/:teacherId/:teacherName" element={<TeacherStudentsTable />} />

              <Route path="students">
                <Route path="new-students" element={<NewStudents />} />
                <Route path="add-new-student" element={<AddNewStudent />} />
                {/* صفحة جدول الانتظار */}
                <Route path="waiting-students" element={<WaitingStudentsTable />} />

                {/* صفحة الفورم لإضافة الطالب للحصة */}
                <Route path="add-to-session" element={<AddToSessionForm />} />
                {/* صفحة جدول الطلاب الحاليين */}
                <Route path="current-students" element={<CurrentStudentsTable />} />
                {/* صفحة الفورم لإضافة طالب جديد */}
                <Route path="add-current" element={<AddCurrentStudentForm />} />
                <Route path="edit/:id" element={<EditCurrentStudentForm />} />
                <Route
                  path="student-profile/:studentId"
                  element={<StudentProfile />}
                />

              </Route>
              {/* الدورات التدريبية */}

              <Route path="courses" >
                <Route index element={<CoursesTable />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="edit-course/:id" element={<EditCourse />} />
              </Route>
              {/* الانشطة والاحداث */}
              <Route path="activities" >
                <Route index element={<ActivitiesTable />} />
                <Route path="add-activity" element={<AddActivity />} />
                <Route path="edit-activity/:id" element={<EditActivity />} />
              </Route>
              {/* التقييمات*/}
              <Route path="reviews/*" element={<ReviewsTable />} />
              <Route path="Exam" >
                <Route path='questions-settings' element={<Questioncontrol />} />
                <Route path="result-settings" element={<ResultSettings />} />
              </Route>
              {/* المستويات */}
              <Route path='levels'>
                <Route index element={<LevelsTable />} />
                <Route path="addlevel" element={<AddLevel />} />
                <Route path="editlevel/:id" element={<EditLevel />} />
              </Route>
              {/* الباقات */}
              <Route path='bouquets'>
                <Route index element={<BouquetsTable />} />
                <Route path="add-bouquet" element={<AddBouquet />} />
                <Route path="edit-bouquet/:id" element={<EditBouquet />} />
              </Route>
              {/* الحصص */}
              <Route path='classes'>
                <Route index element={<ClassesTable />} />
                <Route path="add-classes" element={<AddClass />} />
              </Route>
              {/* الملاحظات */}
              <Route path='notes'>
                <Route index element={<NotesTable />} />
                <Route path="add-note" element={<AddNote />} />
              </Route>
              {/* الدورات الخارجية */}
              <Route path='external-courses'>
                <Route index element={<ExternalCoursesTable />} />
                {/* صفحة إضافة دورة جديدة */}
                <Route path="add" element={<AddExternalCourse />} />

                {/* صفحة تعديل دورة موجودة */}
                <Route path="edit/:id" element={<EditExternalCourse />} />           </Route>
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["User"]}>
                  <Dashboard_layout />
                </ProtectedRoute>
              }
            >
              <Route
                path="dailysession/:teacherId/:teacherName"
                element={<DailyySession />}
              />
            </Route>

            <Route path="/unauthorized" element={<UnAuthorized></UnAuthorized>} />
            <Route path="*" element={<NotFoundPage />} />


          </Routes>

        </BrowserRouter>
        <ToastContainer position="top-center" rtl />


      </AuthProvider >


    </>
  );
}


export default App
