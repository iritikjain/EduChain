import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MuiFileInput } from 'mui-file-input';
import ipfs from '../../utils/ipfs';
import { Slide, toast } from 'react-toastify';

function ChapterInfoComponent({
  courseDetails,
  setCourseDetails,
  moduleNumber,
  chapterNumber,
  CourseId,
}) {
  const [videoUpload, setVideoUpload] = useState(false);
  const [file, setFile] = React.useState(null);

  const [chapterDetails, setChapterDetails] = useState({
    chapterName: '',
    chapterBrief: '',
    chapterVideoUrl: '',
  });

  const [error, setError] = useState({
    chapterNameError: false,
    chapterBriefError: false,
    chapterVideoUrlError: false,
  });

  const validateTitle = (title) => {
    const regex = /^\s*$/;
    return (!(regex.test(title)));
  };

  const validateDesc = (desc) => {
    const regex = /^\s*$/;
    return (!(regex.test(desc)));
  };

  const validateVideoURL = (videourl) => {
    const regex = /^\s*$/;
    return regex.test(videourl);
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.info('Uploading Video ...', {
        position: "top-center",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        const response = await ipfs.add(file);
        toast.dismiss(toastId);
      const videoHash = `https://ipfs.io/ipfs/${response.path}`;
      toast.success('Video Uploaded Successfully !', {
        position: 'top-center',
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setChapterDetails({
        ...chapterDetails,
        chapterVideoUrl: videoHash,
      });
      setVideoUpload(true);
    } catch (error) {
      toast.error('Video Upload Failed !', {
        position: 'top-center',
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    const { chapterName, chapterBrief, chapterVideoUrl } = chapterDetails;
    if (!chapterName || !chapterBrief || !chapterVideoUrl) {
      toast.error('Kindly Fill All The Required Details.', {
        position: "top-center",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return
    }
    const data = chapterDetails;
    data['CourseId'] = CourseId;
    data['moduleNumber'] = moduleNumber;
    data['chapterSequence'] = chapterNumber;
    await fetch('http://127.0.0.1:5000/course/addchapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle successful response
        if (!data.status) {
          throw new Error(data.message);
        }
        toast.success('Chapter Added Successfully !', {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        // handle error response
      });
  };

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `http://127.0.0.1:5000/course/${CourseId}/module/${moduleNumber}/chapter/${chapterNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: String(localStorage.getItem('token')),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          if (data.status) {
            setChapterDetails(data.chapter);
          }
        })
        .catch((error) => {
          // handle error response
          setChapterDetails({
            chapterName: '',
            chapterBrief: '',
            chapterVideoUrl: '',
          });
          setVideoUpload(false);
          setFile(null);
        });
    };
    getData();
  }, [chapterNumber]);

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50vw' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <h1 className='text-2xl font-bold mx-3 mt-1 mb-3 mr-4'>Enter Details Of Chapter {chapterNumber}</h1>
          <TextField
            id='outlined-multiline-flexible'
            label='Chapter Title'
            multiline
            maxRows={3}
            value={chapterDetails.chapterName}
            onChange={(e) => {
              setChapterDetails({
                ...chapterDetails,
                chapterName: e.target.value,
              });
              setError({ ...error, chapterNameError: !validateTitle(e.target.value)});
            }}
            error={error.chapterNameError}
            helperText={error.chapterNameError ? 'Title Is Required' : ''}
          />

          <TextField
            id='outlined-multiline-flexible'
            label='Chapter Description'
            multiline
            maxRows={3}
            value={chapterDetails.chapterBrief}
            onChange={(e) => {
              setChapterDetails({
                ...chapterDetails,
                chapterBrief: e.target.value,
              });
              setError({ ...error, chapterBriefError: !validateDesc(e.target.value)});
            }}
            error={error.chapterBriefError}
            helperText={error.chapterBriefError ? 'Description Is Required' : ''}
          />

          <div className='flex items-center gap-4 w-4/5'>
            <MuiFileInput
              value={file}
              placeholder='Upload Video'
              onChange={handleChange}
              disabled={videoUpload}
            />
            <button
              className='mx-4 my-4 px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white'
              onClick={(e) => handleUpload(e)}
            >
              Upload
            </button>
          </div>
        </div>
        <button
          className='mx-4 my-4 px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white'
          onClick={(e) => handleChapterSubmit(e)}
        >
          Submit Details
        </button>
      </Box>
    </>
  );
}

export default ChapterInfoComponent;
