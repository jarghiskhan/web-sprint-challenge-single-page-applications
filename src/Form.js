import React, { useEffect, useState } from "react";
import * as yup from "yup";
import "./Form.css";

export default function Form() {
  const [pizzaOrder, setPizzaOrder] = useState({
    name: "",
    size: "",
    sauce: "",
    cheese: "",
    peppers: "",
    pepperoni: "",
    olives: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    sauce: "",
    cheese: "",
    peppers: "",
    pepperoni: "",
    olives: "",
    instructions: "",
  });

  //validation and schema

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("need name")
      .min(2, "name must be at least 2 characters"),
    size: yup.string().required("Select a pizza size"),
    sauce: yup.string().required("Select a sauce"),
    cheese: yup.string(),
    peppers: yup.string(),
    pepperoni: yup.string(),
    olives: yup.string(),
    instructions: yup.string(),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(pizzaOrder).then((valid) => {
      setIsButtonDisabled(!valid);
    });
  }, [pizzaOrder]);

  //----------END

  //Functions for submit and change
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", e);
  };

  const onChangeHandler = (e) => {
    e.persist();
    const newFormData = {
      ...pizzaOrder,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setPizzaOrder(newFormData);
  };

  return (
    <div className="pizza-form">
      {/*pizza header*/}
      <div className="pizzaHeader">
        <h2>Build Your Own Pizza</h2>
        <img
          className="pizzaHeaderImage"
          src="/assets/Pizza.jpg"
          alt="Pizza"
        ></img>
      </div>

      <h2>Build Your Own Pizza</h2>

      {/* Beginning of Form */}
      <form onSubmit={formSubmit}>

        {/* Name on the order */}
        <label htmlFor="name-input">
          Name on the order: <span> </span>
          <input
            id="name-input"
            name="name"
            type="text"
            data-cy="name-input"
            onChange={onChangeHandler}
          ></input>
          {errors.name.length > 0 ? (
            <p className="error" data-cy="nameError">
              {errors.name}
            </p>
          ) : null}
        </label>

        {/* Size Section */}
        <div className="sectionDivider">
          <h3>Choice of Size</h3>
          <p>Required</p>
        </div>

        <label htmlFor="size"></label>
        <select name="size" id="size" onChange={onChangeHandler}>
          <option value="">Select</option>
          <option value="small">Small (1-2 people)</option>
          <option value="medium">Medium (3-4 people)</option>
          <option value="large">Large (5-7 people)</option>
        </select>

        {/* Choice of Sauce */}
        <div className="sectionDivider">
          <h3>Choice of Sauce</h3>
          <p>Required</p>
        </div>

        <div className="form-section">
          <label htmlFor="sauce"></label>
          <div className="radio">
            <input
              id="red"
              type="radio"
              value="red"
              name="sauce"
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="red">Original Red</label>
            <br></br>
            <input
              id="garlic"
              type="radio"
              value="garlic"
              name="sauce"
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="garlic">Garlic Ranch</label>
            <br></br>
            <input
              id="bbq"
              type="radio"
              value="bbq"
              name="sauce"
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="bbq">BBQ Sauce</label>
            <br></br>
            <input
              id="s_alfredo"
              type="radio"
              value="s_alfredo"
              name="sauce"
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="s_alfredo">Spinach Alfredo</label>
          </div>
        </div>

        {/* Choice of Toppings */}
        <div className="sectionDivider">
          <h3>Add Toppings</h3>
          <p>Choose some</p>
        </div>

        <div className="form-section">
          <input
            id="cheese_chkbox"
            type="checkbox"
            value="cheese"
            name="cheese"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="cheese_chkbox">Cheese</label>
          <br></br>
          <input
            id="peppers_chkbox"
            type="checkbox"
            value="peppers"
            name="peppers"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="peppers_chkbox">Peppers</label>
          <br></br>
          <input
            id="pepperoni_chkbox"
            type="checkbox"
            value="pepperoni"
            name="pepperoni"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="pepperoni_chkbox">Pepperoni</label>
          <br></br>
          <input
            id="olives_chkbox"
            type="checkbox"
            value="olives"
            name="olives"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="olives_chkbox">Olives</label>
          <br></br>
        </div>

        {/* Special Text */}
        <div className="sectionDivider">
          <h3>Special Instructions</h3>
        </div>
        <div className="form-section">
          <label htmlFor="instructions"></label>
          <textarea
            id="instructions"
            name="instructions"
            rows="4"
            cols="40"
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div className="submit-button">
          <input
            disabled={isButtonDisabled}
            id="order-button"
            type="submit"
            value="Add to Order"
          ></input>
        </div>
      </form>
    </div>
  );
}
