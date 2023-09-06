import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const Categories = ({ category }) => {
  return (
    <Link to={`/courses/${category.category.split(" ").join('')}`}>
      <div
        className='p-8 rounded-lg text-center bg-sky-100 max-h-66'
        style={{ marginRight: '20px' }}
      >
        <img
          className='w-full h-full mb-8'
          src={category.image}
          alt='categories'
        />
        <p>{category.category}</p>
      </div>
    </Link>
  );
};

const CategoriesSlider = () => {
  const CourseCategories = [
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1676156532/sxakrrgpsrusrm3byqcl.png',
      category: 'Digital Marketing',
    },
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1676155812/f2f6aeuqdozg2tmt4nhn.png',
      category: 'UI Development',
    },
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1676155278/v2b85fvgnwtvrffqd51l.png',
      category: 'Data Analytics',
    },
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1676149531/vswei49nchiccunlapgq.png',
      category: 'DBMS',
    },
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1681381223/MicrosoftTeams-image_4_vdw9pu.png',
      category: 'Web Development',
    },
    {
      image:
        'https://res.cloudinary.com/diczskxkx/image/upload/v1681381223/MicrosoftTeams-image_5_iw3nk4.png',
      category: 'Python',
    },
  ];

  const settings = {
    infinite: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    InitialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          InitialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {CourseCategories.map((category, index) => (
          <Categories category={category} key={index} />
        ))}
      </Slider>
    </>
  );
};

export default CategoriesSlider;
