import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { RadioGroup } from '@headlessui/react';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function AddCourseDetailsPage() {
  const plans = [
    "I'm very busy right now (0-2 hours)",
    "I'll work on this on the side (2-4 hours)",
    'I have lots of flexibility (5+ hours)',
  ];

  const topCategories = [
    { label: 'Programming' },
    { label: 'Music' },
    { label: 'Marketing' },
    { label: 'Dance' },
    { label: 'Development' },
  ];

  let [categories] = useState({
    Title: {
      title: 'How about a working title?',
      text: "It's ok if you cant think of a good title now. You can change it later",
    },
    CourseCategory: {
      title: "What category best fits the knowledge you'll share?",
      text: "If you're not sure about the right category. You can change it later",
    },
    Duration: {
      title: 'How much time can you spend creating your course per week?',
      text: "There's no wrong answer. We can help you achieve your goals even if you don't have much time",
    },
  });

  const [selected, setSelected] = useState(plans[0]);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialCategory, setInitialCategory] = useState(topCategories[0].label);

  return (
    <div className='container mx-auto px-52 my-24'>
      <div className='w-full sm:px-0'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {Object.keys(categories).map((category, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <div className='w-full px-4 my-12 flex flex-col gap-8 items-center'>
                  <h1 className='text-2xl font-bold'>
                    {categories[category].title}
                  </h1>
                  <p className='text-lg '>{categories[category].text}</p>
                  {idx === 0 && (
                    <Box
                      component='form'
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '45vw' },
                      }}
                      noValidate
                      autoComplete='off'
                    >
                      <div>
                        <TextField
                          id='outlined-multiline-flexible'
                          label='Title'
                          multiline
                          maxRows={4}
                          value={initialTitle}
                          onChange={(e) => setInitialTitle(e.target.value)}
                        />
                      </div>
                    </Box>
                  )}
                  {idx === 1 && (
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={topCategories}
                      sx={{ width: '45vw' }}
                      value={initialCategory}
                      onChange={(event, newCategory) => {
                        setInitialCategory(newCategory);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label='Category' />
                      )}
                    />
                  )}

                  {idx === 2 && (
                    <div className='w-full px-4 py-8 relative'>
                      <div className='mx-auto w-full max-w-md'>
                        <RadioGroup value={selected} onChange={setSelected}>
                          <div className='space-y-2'>
                            {plans.map((plan) => (
                              <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                      : ''
                                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className='flex w-full items-center justify-between'>
                                      <div className='flex items-center'>
                                        <div className='text-sm'>
                                          <RadioGroup.Label
                                            as='p'
                                            className={`font-medium  ${
                                              checked
                                                ? 'text-white'
                                                : 'text-gray-900'
                                            }`}
                                          >
                                            {plan}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <Link
                        to='/course/upload/draft'
                        className='bg-sky-900 bg-opacity-75 text-white rounded px-4 py-2 hover:bg-sky-800 absolute right-4 mt-6'
                      >
                        Create Course
                      </Link>
                    </div>
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default AddCourseDetailsPage;
