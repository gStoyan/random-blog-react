import { useState } from 'react';
import ErrorModel from '../Models/Error';

export default function useForm(initialValues: any, onSubmitHandler: any){
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<ErrorModel>({} as ErrorModel);

    const validate = (name: any, value: any) => {
        switch (name) {
            //TODO
          case "email":
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (value.length == 0) {
              setErrors({
                ...errors,
                email: "You can't have empty fields!",
              });
            } else if (!regex.test(value)) {
              setErrors({
                ...errors,
                email: "Enter a valid email address",
              });
            } else {
              setErrors({
                ...errors,
                email: "",
              });
            }
            break;
    
          case "password":
            const regexP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;
            if (!regexP.test(value)) {
              setErrors({
                ...errors,
                password:
                  "Password should contain atleast 5 charaters, uppercase, lowercase letters and numbers",
              });
            } else {
              setErrors({
                ...errors,
                password: "",
              });
            }
            break;
          case "confirmPassword":
            if (values.password !== value) {
              setErrors({
                ...errors,
                password: "Passwords are not the equal",
              });
            } else {
              setErrors({
                ...errors,
                password: "",
              });
            }
            break;
    
          default:
            break;
        }
      };
      
      const changeHandler = (e: any) => {
        setValues((state: any) => ({ ...state, [e.target.name]: e.target.value }));
        validate(e.target.name, e.target.value);
      };

      const onSubmit = (e: any) => {
        e.preventDefault();
    
        if (
          Object.keys(errors).some((val) => val !== "") &&
          Object.values(values).some((val) => val === "")
        ) {
          return;
        }
        onSubmitHandler(values);
    
        setValues(initialValues);
      };
    
      return {
        values,
        changeHandler,
        onSubmit,
        errors,
      };
    }
    