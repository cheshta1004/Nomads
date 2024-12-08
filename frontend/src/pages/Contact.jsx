import React, { useRef } from 'react';
import '../styles//Contact.css';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Feedback = () => {
  const form = useRef(); 

  const sendEmail = (e) => {
    e.preventDefault(); 

    emailjs
      .sendForm('service_sxzzut3', 'template_abtejv9', form.current, {
        publicKey: 'xhgMt49JGQnHw5fnx', 
      })
      .then(
        () => {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully",
                icon: "success"
            });
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <section className="contact">
      <form ref={form} onSubmit={sendEmail} className='contact__form ' > 
        <h2><b>Contact Us</b></h2>
        <div className="input-box1">
          <label>Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your name"
            name="from_name"
            required
          />
        </div>
        <div className="input-box1">
          <label>Email Address</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email"
            name="from_email"
            required
          />
        </div>
        <div className="input-box1">
          <label>Your Message</label>
          <textarea
            name="message"
            className="field mess"
            placeholder="Enter Your Message"
            required
          ></textarea>
        </div>
        <button type="submit"className="btn btn-primary" style={{background:"var(--secondary-color)"}}>Send Message</button>
      </form>
    </section>
  );
};

export default Feedback;