import React from 'react';
import Poster from '../Poster/CompletedPoster.Component';

const CompletedCourses = (props) => {

  const { posters } = props;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posters.map((each,index) => (
          <Poster {...each} key={index}/>
        ))}
      </div>
    </>
  );
};

export default CompletedCourses;
