import React from "react";
import {
  useFormValues,
  useFormErrors,
  TextField as InputText
} from "../CustomForm";
import {
  required,
  email,
  minLength,
  atleastOneCaps
} from "../CustomForm/validations.js";

import logo from "../../assets/HMLogosblack.png";

import "./styles.css";

export default function LoginForm({ signIn, loading, success }) {
  const { formValues, setInputValue } = useFormValues({
    email: "",
    password: ""
  });

  const formValidations = {
    email: [required, email, value => minLength(value, 5)],
    password: [required, atleastOneCaps, value => minLength(value, 6)]
  };

  const {
    formErrors,
    validateForm,
    validateInputValue,
    clearInputErrors
  } = useFormErrors(formValidations);

  function submitForm(event) {
    event.preventDefault();

    const formIsValid = validateForm(formValues);

    if (formIsValid) {
      signIn(formValues);
    }
  }

  return (
    <section className="card-container">
      <img src={logo} className="logo" alt="HealthifyMe" />
      <h3 className="thin-text pri-color">Sign in</h3>
      <h5 className="thin-text pri-color">Use your healthifyMe account</h5>
      <form onSubmit={submitForm} noValidate>
        <InputText
          disable={loading}
          name="email"
          className="form-field"
          placeholder="Enter Your Email"
          type="email"
          value={formValues.email}
          onChange={setInputValue}
          onBlur={validateInputValue}
          errors={formErrors.email}
        />
        <InputText
          name="password"
          disable={loading}
          placeholder="Enter Your Password"
          type="password"
          value={formValues.password}
          onChange={setInputValue}
          onBlur={clearInputErrors}
          errors={formErrors.password}
          className="form-field"
        />
        {loading ? (
          <div className="spinner-container spinner" />
        ) : (
          <button
            type="submit"
            className={`form-field btn ${success ? "btn-success" : ""}`}
          >{`${success ? "Login again" : "Login"}`}</button>
        )}
      </form>
    </section>
  );
}
