import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home.Page';
import DefaultLayout from './layouts/Default.Layout';
import SignIn from './components/SignIn/SignIn.Component';
import SignUp from './components/SignUp/SignUp.Component';
import NGORegistration from './components/NGORegistration/NGORegistration.Component';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.Component';
import ChangePassword from './components/ForgotPassword/ChangePassword.Component';
import NGOList from './pages/NGOList.Page';
import NGOApproval from './pages/NGOApproval.Page';
import AllCourses from './pages/AllCourses.Page';
import Profile from './pages/Profile.Page';
import InProgressCourses from './pages/InProgressCourses.Page';
import CompletedCourses from './pages/CompletedCourses.Page';
import UploadedCourses from './pages/UploadedCourses.Page';
import YourCoursesPage from './pages/YourCourses.Page';
import Students from './pages/Students.Page';
import SingleCourse from './pages/SingleCourse.Page';
import CoursePlay from './pages/CoursePlay.Page';
import CartPage from './pages/Cart.Page';
import UploadCourseDraftPage from './pages/UploadCourseDraft.Page';
import CategoryCoursesPage from './pages/CategoryCourses.Page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoriesPage from './pages/CategoriesPage';
import UsersPage from './pages/Users.Page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <DefaultLayout>
                <HomePage />
              </DefaultLayout>
            }
          />
          <Route path='/login' exact element={<SignIn />} />
          <Route path='/register' exact element={<SignUp />} />
          <Route path='/ngoregistration' exact element={<NGORegistration />} />
          <Route path='/forgotpassword' exact element={<ForgotPassword />} />
          <Route path='/changepassword' exact element={<ChangePassword />} />
          <Route
            path='/ngolist'
            exact
            element={
              <DefaultLayout>
                <NGOList />
              </DefaultLayout>
            }
          />
          <Route
            path='/ngoapproval'
            exact
            element={
              <DefaultLayout>
                <NGOApproval />
              </DefaultLayout>
            }
          />
          <Route
            path='/profile'
            exact
            element={
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            }
          />
          <Route
            path='/inprogresscourses'
            exact
            element={
              <DefaultLayout>
                <InProgressCourses />
              </DefaultLayout>
            }
          />
          <Route
            path='/completedcourses'
            exact
            element={
              <DefaultLayout>
                <CompletedCourses />
              </DefaultLayout>
            }
          />
          <Route
            path='/uploadedcourses'
            exact
            element={
              <DefaultLayout>
                <UploadedCourses />
              </DefaultLayout>
            }
          />
          {/* <Route
            path='/yourcourses'
            exact
            element={
              <DefaultLayout>
                <YourCoursesPage />
              </DefaultLayout>
            }
          /> */}
          <Route
            path='/students'
            exact
            element={
              <DefaultLayout>
                <Students />
              </DefaultLayout>
            }
          />
          <Route
            path='/courses'
            exact
            element={
              <DefaultLayout>
                <AllCourses />
              </DefaultLayout>
            }
          />
          <Route
            path='/course/:id'
            exact
            element={
              <DefaultLayout>
                <SingleCourse />
              </DefaultLayout>
            }
          />
          <Route
            path='/course/play/:id'
            exact
            element={
              <DefaultLayout>
                <CoursePlay />
              </DefaultLayout>
            }
          />
          <Route
            path='/courses/category'
            exact
            element={
              <DefaultLayout>
                <CategoryCoursesPage />
              </DefaultLayout>
            }
          />
          <Route
            path='/cart'
            exact
            element={
              <DefaultLayout>
                <CartPage />
              </DefaultLayout>
            }
          />
          <Route
            path='/course/upload/draft'
            exact
            element={
              <DefaultLayout>
                <UploadCourseDraftPage />
              </DefaultLayout>
            }
          />
          <Route
            path='/course/upload/draft/:id'
            exact
            element={
              <DefaultLayout>
                <UploadCourseDraftPage />
              </DefaultLayout>
            }
          />
          <Route
            path='/courses/:category'
            exact
            element={
              <DefaultLayout>
                <CategoriesPage />
              </DefaultLayout>
            }
          />
          <Route
            path='/users'
            exact
            element={
              <DefaultLayout>
                <UsersPage />
              </DefaultLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
