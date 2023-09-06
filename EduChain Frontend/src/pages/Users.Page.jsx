import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar.Component';
import Users from '../components/Students/Users.Component';

const UsersPage = () => {

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
            <Users />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
