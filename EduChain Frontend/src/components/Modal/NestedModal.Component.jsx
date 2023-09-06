import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ moduleDetails, setModuleDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [chapterDetails, setChapterDetails] = React.useState({
    chapterTitle: '',
    chapterDescription: '',
    chapterNumber: null,
    chapterVideo: '',
  });

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add Chapters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 className='text-xl font-bold'>Enter Chapter Details</h2>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { my: 2, width: '20rem' },
            }}
            noValidate
            autoComplete='off'
          >
            <div>
              <TextField
                id='outlined-multiline-flexible'
                label='Chapter Title'
                multiline
                maxRows={3}
                value={chapterDetails.chapterTitle}
                onChange={(e) =>
                  setChapterDetails({
                    ...chapterDetails,
                    chapterTitle: e.target.value,
                  })
                }
              />
              <TextField
                id='outlined-multiline-flexible'
                label='Chapter Number'
                multiline
                maxRows={3}
                value={chapterDetails.chapterNumber}
                onChange={(e) =>
                  setChapterDetails({
                    ...chapterDetails,
                    chapterNumber: e.target.value,
                  })
                }
              />
              <TextField
                id='outlined-multiline-flexible'
                label='Chapter Description'
                multiline
                maxRows={3}
                value={chapterDetails.chapterDescription}
                onChange={(e) =>
                  setChapterDetails({
                    ...chapterDetails,
                    chapterDescription: e.target.value,
                  })
                }
              />
              <TextField
                id='outlined-multiline-flexible'
                label='Chapter Video'
                multiline
                maxRows={3}
                value={chapterDetails.chapterVideo}
                onChange={(e) =>
                  setChapterDetails({
                    ...chapterDetails,
                    chapterVideo: e.target.value,
                  })
                }
              />
            </div>
          </Box>
          <Button
            onClick={() => {
              setModuleDetails({
                ...moduleDetails,
                moduleChapters: [
                  ...moduleDetails.moduleChapters,
                  chapterDetails,
                ],
              });
              handleClose();
            }}
          >
            Add Chapter
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  open,
  handleClose,
  courseDetails,
  setCourseDetails,
}) {
  const [moduleDetails, setModuleDetails] = React.useState({
    moduleTitle: '',
    moduleDescription: '',
    moduleNumber: null,
    moduleChapters: [],
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 className='text-xl font-bold'>Enter Module Details</h2>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { my: 2, width: '20rem' },
            }}
            noValidate
            autoComplete='off'
          >
            <div>
              <TextField
                id='outlined-multiline-flexible'
                label='Module Title'
                multiline
                maxRows={3}
                value={moduleDetails.moduleTitle}
                onChange={(e) =>
                  setModuleDetails({
                    ...moduleDetails,
                    moduleTitle: e.target.value,
                  })
                }
              />
              <TextField
                id='outlined-multiline-flexible'
                label='Module Number'
                multiline
                maxRows={3}
                value={moduleDetails.moduleNumber}
                onChange={(e) =>
                  setModuleDetails({
                    ...moduleDetails,
                    moduleNumber: e.target.value,
                  })
                }
              />
              <TextField
                id='outlined-multiline-flexible'
                label='Module Description'
                multiline
                maxRows={3}
                value={moduleDetails.moduleDescription}
                onChange={(e) =>
                  setModuleDetails({
                    ...moduleDetails,
                    moduleDescription: e.target.value,
                  })
                }
              />
            </div>
          </Box>
          <ChildModal
            moduleDetails={moduleDetails}
            setModuleDetails={setModuleDetails}
          />
          <Button
            onClick={() => {
              setCourseDetails({
                ...courseDetails,
                modules: [...courseDetails.modules, moduleDetails],
              });
              handleClose();
            }}
          >
            Add Module
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
