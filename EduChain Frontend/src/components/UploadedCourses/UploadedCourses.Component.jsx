import React from 'react';
import Poster from '../Poster/UploadedPoster.Component';

const UploadedCourses = (props) => {
  const { posters} = props;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {posters.map((each) => (
          <Poster {...each} />
        ))}
      </div>
    </>
  );
};

export default UploadedCourses;
