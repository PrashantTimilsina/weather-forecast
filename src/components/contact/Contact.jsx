import "./contact.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contact() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  function onSubmit() {
    toast.success("Form submitted successfully");
    reset();
  }
  function handleErrors(field) {
    if (field.FullName) {
      toast.error(field.FullName.message);
    }
    if (field.Number) {
      toast.error(field.Number.message);
    }
  }

  return (
    <div className="form-wrapper">
      <ToastContainer position="top-right" autoClose={1000} />
      <form onSubmit={handleSubmit(onSubmit, handleErrors)} className="form">
        <h2 className="contact">Contact Form</h2>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          className="field"
          id="name"
          placeholder="Enter full name"
          {...register("FullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Your full name should contain at least 3 digits",
            },
          })}
        />
        {errors.FullName && <p className="errors">{errors.FullName.message}</p>}

        <label htmlFor="number">Contact No.</label>
        <input
          type="number"
          className="field"
          id="number"
          placeholder="Enter your number"
          {...register("Number", {
            required: "Contact number is required",
            minLength: { value: 10, message: "10 digits are required" },
            maxLength: {
              value: 10,
              message: "More than 10 digits are not allowed",
            },
          })}
        />
        {errors.Number && <p className="errors">{errors.Number.message}</p>}
        <button className="submit">Submit</button>
      </form>
      <div className="emoji">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7500/7500850.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Contact;
