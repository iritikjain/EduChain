import React, {useEffect} from 'react';
import Sidebar from '../components/Sidebar/Sidebar.Component';
import Profile from '../components/Profile/Profile.Component';
import { Slide, toast } from 'react-toastify';

const ProfilePage = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.history.pushState(null, null, 'http://localhost:3000/');
      window.dispatchEvent(new Event('popstate'));
      toast.error('You Are Not Signed In! Sign In To View Your Profile.', {
        position: 'top-center',
        autoClose: 4000,
        transition: Slide,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 my-10'>
        <div className='w-full lg:flex lg:flex-row gap-4'>
          <div className='lg:w-1/5 p-4 bg-white rounded'>
            <div>
              <Sidebar />
            </div>
          </div>
          <div className='lg:w-4/5 p-4 bg-white rounded'>
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
