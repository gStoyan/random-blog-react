import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
const Create = () => {
const onCreateSubmit = (data: any) => {
    //TODO send data to the server
    setTimeout(() => {
        alert(`Success! \n ${JSON.stringify(data)}`);
    }, 3000);
};

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

  const renderStepOne = () => (
    <form onSubmit={nextStep}>
      <label>
        Title:
        <input type="text" name="title"  value={values.title} onChange={changeHandler} required />
      </label>
      <button type="submit">Next</button>
    </form>
  );

  const renderStepTwo = () => (
    <form onSubmit={onSubmit}>
      <label>
        <h2>{values.title}</h2>
        Content:
        <textarea name="content" value={values.content} onChange={changeHandler} required />
      </label>
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Submit</button>
    </form>
  );

  return (
    <div>
      <h2></h2>
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
    </div>
  );
};

export default Create;

