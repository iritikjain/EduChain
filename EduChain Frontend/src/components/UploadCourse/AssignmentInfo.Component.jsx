import React, { useState, useEffect } from 'react';
import { toast, Slide } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Divider } from '@mui/material';

function Assignment({ courseDetails, setCourseDetails, CourseId }) {
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (event, index) => {
    const { value } = event.target;
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };

  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index].answer = value;
      return updatedQuestions;
    });
  };

  const addQuestion = () => {
    setQuestions((prevState) => [
      ...prevState,
      {
        questionNumber: prevState.length + 1,
        question: '',
        options: ['', '', '', ''],
        answer: '',
      },
    ]);
  };

  // const [error, setError] = useState({
  //   question: false,
  //   options: [false, false, false, false],
  // });

  // const validateQuestion = (que) => {
  //   const regex = /^\s*$/;
  //   return (!(regex.test(que)));
  // };

  // const validateOptions = (opt) => {
  //   const regex = /^\s*$/;
  //   return (!(regex.test(opt)));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    questions.map((question) => {
      question.answer = question.options[parseInt(question.answer)];
    });

    const arrayOfQuestions = [];
    questions.map((q) => {
      arrayOfQuestions.push({
        question: q.question,
        questionNumber: q.questionNumber,
        optionA: q.options[0],
        optionB: q.options[1],
        optionC: q.options[2],
        optionD: q.options[3],
        correctOption: q.answer,
      });
    });

    let data = {};
    data['courseId'] = CourseId;
    data['assessmentList'] = arrayOfQuestions;

    await fetch('http://127.0.0.1:5000/course/add-assessment', {
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
        toast.success('Successfully Added Assignment !', {
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
        setCourseDetails({
          ...courseDetails,
          courseAssessmentIds: data.addAssessment,
        });
      })
      .catch((error) => {
        // handle error response
      });
  };

  useEffect(() => {
    if (CourseId) {
      const getData = async () => {
        await fetch(`http://127.0.0.1:5000/course/${CourseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: String(localStorage.getItem('token')),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // handle successful response
            if (!data.status) {
              throw new Error(data.message);
            }
            setCourseDetails(data.course);
            let ques = [];
            data.course.courseAssessmentIds.map((assessment, index) => {
              ques.push({
                questionNumber: index,
                question: assessment.question,
                answer: [
                  assessment.optionA,
                  assessment.optionB,
                  assessment.optionC,
                  assessment.optionD,
                ].map((option, index) => {
                  if (option === assessment.correctOption) {
                    return index.toString();
                  }
                })[0],
                options: [
                  assessment.optionA,
                  assessment.optionB,
                  assessment.optionC,
                  assessment.optionD,
                ],
              });
            });
            setQuestions(ques);
          })
          .catch((error) => {
            // handle error response
          });
      };
      getData();
    }
  }, [CourseId]);

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
        <h1 className='text-2xl font-bold mx-3 mt-1 mb-2 mr-4'>Enter Assignment Details</h1>
        {questions.map((question, index) => (
          <div key={index}>
            <TextField
              id={`question-${index}`}
              label={`Enter Question ${index + 1}`}
              multiline
              maxRows={3}
              fullWidth
              value={question.question}
              onChange={(event) => handleQuestionChange(event, index)}
            />

            <RadioGroup
              aria-labelledby={`options-${index}-label`}
              name={`options-${index}`}
              className='mx-4'
              value={question.answer}
              onChange={(event) => handleAnswerChange(event, index)}
            >
              {question.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={`${optionIndex}`}
                  control={<Radio />}
                  label={
                    <TextField
                      id={`option-${index}-${optionIndex}`}
                      label={`Enter Option ${optionIndex + 1}`}
                      multiline
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(event, index, optionIndex)
                      }
                    />
                  }
                />
              ))}
            </RadioGroup>

            <Divider />
          </div>
        ))}

        <div className='m-4'>
          <Button
            variant='outlined'
            color='warning'
            onClick={addQuestion}
            style={{ marginRight: '20px', marginTop: '15px'}}
          >
            <AddCircleOutlineIcon className='mx-2' /><p className='text-black mt-1'>Add More Questions</p>
          </Button>

          <Button
            variant='outlined'
            color='warning'
            onClick={(e) => handleSubmit(e)}
            style={{ marginRight: '20px', marginTop: '15px'}}
          >
            <p className='text-black mt-1'>Submit</p>
          </Button>
        </div>
      </Box>
    </>
  );
}

export default Assignment;
