import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import avatar from '../assets/profile.jpg';
import styles from '../styles/username.module.css';
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";

export default function Username() {

     const navigate = useNavigate();
     const setUsername = useAuthStore(state => state.setUsername)
     const formik = useFormik({
          initialValues: {
               username: 'example'
          },
          validate: usernameValidate,
          validateOnBlur: false,
          validateOnChange: false,
          onSubmit: async (values) =>{
               setUsername(values.username);
               navigate('/password')
          }
     })
     return (
          <div className="container mx-auto justify-center items-center flex mt-20 mb-20 h-auto">
               <Toaster position="top-center" reverseOrder={false}></Toaster>
               <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                         <h4 className="text-5xl font-bold">Hello there!</h4>
                         <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                              Explore More by connecting with us.
                         </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                         <div className="profile flex justify-center py-4">
                              <img src={avatar} alt="avatar" className={styles.profile_img} />
                         </div>
                         <div className="textbox flex flex-col items-center gap-6">
                              <input type="text" {...formik.getFieldProps('username')} placeholder="Username" className={styles.textbox} />
                              <button type="submit" className={styles.btn}>Let's go!</button>
                         </div>
                         <div className="text-center py-4">
                              <span className="text-gray-500">Not a Member <Link className="text-blue-500" to="/register">Register Now!</Link></span>
                         </div>
                    </form>
               </div>
          </div>

     )
}