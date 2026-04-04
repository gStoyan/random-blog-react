import { ChangeEvent, FormEvent, useState } from "react";

type FormErrors<T> = Partial<Record<keyof T, string>>;

export default function useForm<T extends object>(
  initialValues: T,
  onSubmitHandler: (values: T) => void | boolean | Promise<void | boolean>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setFieldError = (field: keyof T, message: string) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: message,
    }));
  };

  const validate = (name: keyof T, value: string, nextValues: T) => {
    const nextFormValues = nextValues as Record<string, string>;

    switch (name) {
      case "email" as keyof T: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (value.trim().length === 0) {
          setFieldError(name, "You can't have empty fields!");
        } else if (!emailRegex.test(value)) {
          setFieldError(name, "Enter a valid email address");
        } else {
          setFieldError(name, "");
        }
        break;
      }
      case "password" as keyof T: {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;

        if (!passwordRegex.test(value)) {
          setFieldError(
            name,
            "Password should contain at least 5 characters, uppercase, lowercase letters and numbers",
          );
        } else {
          setFieldError(name, "");
        }

        if (nextFormValues.confirmPassword) {
          setFieldError(
            "confirmPassword" as keyof T,
            nextFormValues.confirmPassword !== value
              ? "Passwords do not match"
              : "",
          );
        }
        break;
      }
      case "confirmPassword" as keyof T:
        setFieldError(
          name,
          nextFormValues.password !== value ? "Passwords do not match" : "",
        );
        break;
      default:
        break;
    }
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const key = name as keyof T;
    const nextValues = {
      ...values,
      [key]: value,
    } as T;

    setValues(nextValues);
    validate(key, value, nextValues);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some(Boolean);
    const hasEmptyValues = Object.values(values as Record<string, string>).some(
      (value) => value.trim() === "",
    );

    if (hasErrors || hasEmptyValues) {
      return;
    }

    const shouldReset = await onSubmitHandler(values);

    if (shouldReset !== false) {
      setValues(initialValues);
      setErrors({});
    }
  };

  return {
    values,
    changeHandler,
    onSubmit,
    errors,
  };
}
