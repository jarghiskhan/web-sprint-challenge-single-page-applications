import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import "./Form.css";

export default function Form() {
  const [orders, setOrders] = useState([]);

  const [pizzaOrder, setPizzaOrder] = useState({
    name: "",
    size: "",
    cheese: false,
    peppers: false,
    pepperoni: false,
    olives: false,
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    cheese: "",
    peppers: "",
    pepperoni: "",
    olives: "",
    instructions: "",
  });

//#region formSchema, validateChange, useEffect

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("need name")
      .min(2, "name must be at least 2 characters"),
    size: yup.string().required("Select a pizza size"),
    cheese: yup.boolean(),
    peppers: yup.boolean(),
    pepperoni: yup.boolean(),
    olives: yup.boolean(),
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

//#endregion

//#region formSubmit and onChangeHandler
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
    .post("https://reqres.in/api/orders", pizzaOrder)
    .then((response) => {
      setOrders(response.data);
      setPizzaOrder({
        name: "",
        size: "",
        cheese: "",
        peppers: "",
        pepperoni: "",
        olives: "",
        instructions: "",
      });
    })
    .catch((err) => console.log(err.response));
    console.log("Form submitted", e);
  };

  const onChangeHandler = (e) => {
    e.persist();
    const newFormData = {
      ...pizzaOrder,
      [e.target.name]:  e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setPizzaOrder(newFormData);
  };
//#endregion

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
      <form id="pizza-form" onSubmit={formSubmit}>

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

        <label htmlFor="size-dropdown"></label>
        <select name="size" id="size-dropdown" onChange={onChangeHandler}>
          <option value="">Select</option>
          <option value="small">Small (1-2 people)</option>
          <option value="medium">Medium (3-4 people)</option>
          <option value="large">Large (5-7 people)</option>
        </select>
        {errors.size.length > 0 ? (
            <p className="error" data-cy="nameError">
              {errors.size}
            </p>
          ) : null}


        {/* Choice of Toppings */}
        <div className="sectionDivider">
          <h3>Add Toppings</h3>
          <p>Choose some</p>
        </div>

        <div className="form-section">
          <input
            id="cheese_chkbox"
            type="checkbox"
            
            name="cheese"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="cheese_chkbox">Cheese</label>
          <br></br>
          <input
            id="peppers_chkbox"
            type="checkbox"
            
            name="peppers"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="peppers_chkbox">Peppers</label>
          <br></br>
          <input
            id="pepperoni_chkbox"
            type="checkbox"
            
            name="pepperoni"
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="pepperoni_chkbox">Pepperoni</label>
          <br></br>
          <input
            id="olives_chkbox"
            type="checkbox"
            
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
          <label htmlFor="special-text"></label>
          <textarea
            id="special-text"
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
        <pre data-cy="output">{JSON.stringify(orders, null, 2)}</pre>
      </form>
    </div>
  );
}
