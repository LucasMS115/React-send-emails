import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import emailjs from "emailjs-com";
import './App.css';

function App() {

  const [message, setMessage] = useState(" ");
  const  {register, handleSubmit, errors, reset} = useForm();

  const onSubmit = async (data) => {

    await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', data, 'USER_ID')
      .then((result) => {
          console.log("result => " + result.text);
      }, (error) => {
          console.log("error => " + error.text);
      });
    
    reset();
    setMessage("Done :)");
  }

  return (
    <div className="App">

      <div className='flex-container-column'>


        <form className='flex-container-column' onSubmit={handleSubmit((event) => onSubmit(event))}>

            <h1 style={{margin: "1rem", fontSize:"3rem"}}> Send us a message :) </h1>
            <div className='fields-container'>

              <label className='form-label' htmlFor='name'>Name</label>
              <input className='form-field' type='text' placeholder='Your name' name='name' ref={register({required:true, minLength: 9})}/>
              {errors.name && <span className='warning'>Invalid name (try your full name)</span>}

              <label className='form-label' htmlFor='email'>E-mail</label>
              <input className='form-field' type='email' placeholder='Your Email' name='email' ref={register({required:true, minLength: 11})}/>
              {errors.email && <span className='warning' >Invalid e-mail</span>}

              <label className='form-label' htmlFor='subject'>Subject</label>
              <input className='form-field' type='text' placeholder='Subject' name='subject' ref={register({required:true, minLength: 8, maxLength: 60})}/>
              {errors.subject && <span className='warning' >Invalid subject</span>}

              <label className='form-label' htmlFor='msg'>Message</label>
              <textarea className='form-text-area' type='text' placeholder='Your message' name='msg' ref={register({required:true, minLength: 13})}/>
              {errors.msg && <span className='warning' >Invalid message</span>}

            </div>

            <input className='form-btn' type='submit' value='Send'/>
            {!errors.name && !errors.email && !errors.subject && !errors.msg && <span style={{color: "green", margin: "1rem", fontSize: "2rem"}}>{message}</span>}

        </form>

      </div>

    </div>
  );
}

export default App;
