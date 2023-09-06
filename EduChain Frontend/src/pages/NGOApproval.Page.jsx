import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar.Component';
import NGOApproval from '../components/NGOApproval/NGOApproval.Component';

const NGOApprovalPage = () => {

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
            <NGOApproval />
          </div>
        </div>
      </div>
    </>
  );
};

export default NGOApprovalPage;
