import React, { useState } from "react";
import "../ContactUs/ContactUs.scss";
import { CONTACT_DATA } from "../UI_Constants";
import Button from "../Button/Button";
import emailjs from "@emailjs/browser";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs({ day_night }) {
  const { Header, Name, Email, Message } = CONTACT_DATA;
  const [formdata, setformdata] = useState({
    me: "Magizhan",
    name: "",
    email: "",
    message: "",
  });
  emailjs.init({
    publicKey: "5nrIM_6c8WkJ5roNd",
    blockHeadless: true,
    blockList: {
      list: ["foo@emailjs.com", "bar@emailjs.com"],
      watchVariable: "userEmail",
    },
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });
  const handleChange = ({ target: { value, name } }) => {
    setformdata({ ...formdata, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formdata.name && formdata.email && formdata.message){
    emailjs
      .send("service_dlf2gnj", "template_vkf7c4a", formdata)
      .then((response) => {
        console.log(response);
        toast.info("Email sent!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${day_night?"light":"dark"}`,
          transition: Zoom,
        });
        setformdata({
          me: "Magizhan", 
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
    }else{
      toast.warn("All Fields are Mandatory!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${day_night?"light":"dark"}`,
        transition: Zoom,
      });
    }
  };
  return (
    <div className="contactmain">
      <h1
        className="contactheader"
        style={{ color: `${day_night ? "white" : "#222"}` }}
      >
        {Header}
      </h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={Name}
          style={{ color: `${day_night ? "white" : "#222"}` }}
          className={day_night && "day"}
          onChange={handleChange}
          name="name"
          value={formdata.name}
        />
        <input
          type="email"
          placeholder={Email}
          style={{ color: `${day_night ? "white" : "#222"}` }}
          className={day_night && "day"}
          onChange={handleChange}
          name="email"
          value={formdata.email}
        />
        <textarea
          type="address"
          placeholder={Message}
          style={{ color: `${day_night ? "white" : "#222"}` }}
          className={day_night && "day"}
          onChange={handleChange}
          name="message"
          value={formdata.message}
        />
        <Button type="submit" name="Submit" day_night={day_night} />
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={day_night?"light":"dark"}
        transition:Zoom
      />
    </div>
  );
}

export default ContactUs;
