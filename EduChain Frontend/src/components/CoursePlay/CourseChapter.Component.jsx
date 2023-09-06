import React from 'react';

//Headless UI
import { AspectRatio } from '@chakra-ui/react';

function CourseChapterComponent({ chapterVideoUrl, chapterBrief }) {
  return (
    <>
      <AspectRatio maxW='full' ratio={2}>
        <iframe title={chapterBrief} src={chapterVideoUrl} allowFullScreen />
      </AspectRatio>
      <h1 className='text-2xl font-bold my-4'>About This Chapter</h1>
      <p>{chapterBrief}</p>
    </>
  );
}

export default CourseChapterComponent;
