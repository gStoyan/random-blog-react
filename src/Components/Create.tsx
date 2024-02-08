import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
const Create = () => {
const onCreateSubmit = (data: any) => {
    //TODO send data to the server
    setTimeout(() => {
        alert(`Success! \n ${JSON.stringify(data)}`);
    }, 3000);
};

//Question? where to write hooks and hwhere to write functions

  const [step , setStep] = useState(1);
  const {values, changeHandler, onSubmit, errors} = useForm(
    {
      title: '',
      content: '',
    },
    onCreateSubmit
  );
    
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={values.title} onChange={changeHandler} />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Email:</label>
            <input type="text" name="content" value={values.content} onChange={changeHandler} />
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <form onSubmit={onCreateSubmit}>
      {renderForm()}
    </form>
  );
};

export default Create;

