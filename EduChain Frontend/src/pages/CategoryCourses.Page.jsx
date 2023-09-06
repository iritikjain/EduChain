import React from 'react';
import CategoryCourses from '../components/CategoryCourses/CategoryCourses.Component';
import courses from '../utils/data';

function CategoryCoursesPage() {
  
    return (
      <>
        <div className='container mx-auto px-4 md:px-12 mt-8 mb-12'>
          <CategoryCourses
            title='{ Category }'
            subtitle='Start Learning { Category } Today !'
            posters={courses}
          />
        </div>
      </>
    );
  }
  
  export default CategoryCoursesPage;
  