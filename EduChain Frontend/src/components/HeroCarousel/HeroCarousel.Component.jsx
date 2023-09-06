import React, { useState } from 'react';
import HeroSlider from 'react-slick';
import { NextArrow, PrevArrow } from './Arrows.Component';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {

  const courses = [
    {
      image:
      'https://res.cloudinary.com/diczskxkx/image/upload/v1681403478/ds_do2sy2.jpg',
      category: 'Data Science',
    },
    {
      image:
      'https://res.cloudinary.com/diczskxkx/image/upload/v1681379408/MicrosoftTeams-image_3_wnp1bl.png',
      category: 'Web Development',
    },
    {
      image:
      'https://res.cloudinary.com/diczskxkx/image/upload/v1681403479/bc_shvsah.png',
      category: 'Blockchain',
    },
  ];

  const settingsLG = {
    arrows: true,
    autoplay: true,
    centerMode: true,
    centerPadding: '300px',
    slidesToShow: 1,
    infinite: true,
    slideToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const settings = {
    arrows: true,
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    slideToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div className='lg:hidden'>
        <HeroSlider {...settings}>
          {courses.map((course, index) => (
            <div className='w-full h-58 md:h-80 pt-3 sm:px-2 md:px-2' key={index}>
              <Link to={`/courses/${course.category}`}>
              <img
                src={course.image}
                alt='Hero Banner'
                className='w-full h-full rounded-md object-center '
              />
              </Link>
            </div>
          ))}
        </HeroSlider>
      </div>
      <div className='hidden lg:block'>
        <HeroSlider {...settingsLG}>
          {courses.map((course, index) => (
            <div className='w-full h-96 px-2 pt-3 sm:px-2 md:px-2' key={index}>
              <Link to={`/courses/${course.category}`}>
              <img
                src={course.image}
                alt='Hero Banner'
                className='w-full h-full rounded-md object-center '
              />
              </Link>
            </div>
          ))}
        </HeroSlider>
      </div>
    </>
  );
};

export default HeroCarousel;
