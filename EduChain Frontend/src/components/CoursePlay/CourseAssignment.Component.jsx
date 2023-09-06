import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { Slide, toast } from 'react-toastify';

function CourseAssignmentComponent(props) {
  const questions = props.courseAssessmentIds;
  const userAnswerArray = [];

  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    if (index < userAnswerArray.length) {
      userAnswerArray[index] =
        questions[index][`option${String.fromCharCode(65 + parseInt(value))}`];
    } else {
      userAnswerArray.push(
        questions[index][`option${String.fromCharCode(65 + parseInt(value))}`]
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = [];
    questions.map((ques, index) => {
      data.push({
        question: ques.question,
        correctOption: userAnswerArray[index],
      });
    });
    await fetch(`http://127.0.0.1:5000/course/assessment/${props.courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        assessmentList: data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          throw new Error(data.message);
        }
        toast.success(`Congratulations You Have Scored ${data.assessmentScore} Out Of ${questions.length} !`, {
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
          window.history.pushState(null, null, 'http://localhost:3000/completedcourses');
          window.dispatchEvent(new Event('popstate'));
      })
      .catch((error) => {
        // handle error response
      });
  };

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
        {questions.map((question, index) => (
          <div key={index}>
            <TextField
              id={`question-${index}`}
              label={`Enter Question ${index + 1}`}
              multiline
              maxRows={3}
              fullWidth
              value={question.question}
              disabled={true}
            />

            <RadioGroup
              aria-labelledby={`options-${index}-label`}
              name={`options-${index}`}
              className='mx-4'
              onChange={(event) => handleAnswerChange(event, index)}
            >
              {['optionA', 'optionB', 'optionC', 'optionD'].map(
                (option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={`${optionIndex}`}
                    control={<Radio />}
                    label={
                      <TextField
                        id={`option-${index}-${optionIndex}`}
                        multiline
                        value={question[option]}
                        disabled={true}
                      />
                    }
                  />
                )
              )}
            </RadioGroup>

            <Divider />
          </div>
        ))}

        <div className='m-4'>
          <Button
            variant='outlined'
            color='warning'
            onClick={(e) => handleSubmit(e)}
            style={{ marginRight: '20px' }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
}

export default CourseAssignmentComponent;
