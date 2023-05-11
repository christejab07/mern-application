import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import avatar from '../assets/profile.jpg';
import styles from '../styles/username.module.css';
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import extend from '../styles/profile.module.css';
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";

export default function Profile() {
const [file, setFile] = useState()
const [{isLoading, apiData, serverError}] = useFetch()
const navigate = useNavigate();
     const formik = useFormik({
          initialValues: {
               firstName: apiData?.firstName || '',
               lastName: apiData?.lastName || '',
               email: apiData?.email ||'',
               mobile: apiData?.mobile ||'',
               address: apiData?.address || ''
          },
          enableReinitialize: true,
          validate: profileValidation,
          validateOnBlur: false,
          validateOnChange: false,
          onSubmit: async (values) =>{
               values = await Object.assign(values, {profile : file || apiData?.profile || ''})
               let updatePromise = updateUser(values);

               toast.promise(updatePromise, {
                    loading: 'Updating...',
                    success: <b>Updated successfully...!</b>,
                    error: <b>Could not Update!</b>
               })
          }
     })
     /** */
     const onUpload = async e => {
          const base64 = await convertToBase64(e.target.files[0]);
          setFile(base64);
     }
     // logout handler function
     function userLogout(){
          localStorage.removeItem('token');
          navigate('/')
     } 
     if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>
     if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>
     return (
          <div className="container mx-auto justify-center items-center flex mt-20 mb-20 h-auto">
               <Toaster position="top-center" reverseOrder={false}></Toaster>
               <div className={` ${styles.glass} ${extend.glass}`} style={{width: "60%"}}>
                    <div className="title flex flex-col items-center">
                         <h4 className="text-5xl font-bold">Profile</h4>
                         <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                             You can update details! 
                         </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                         <div className="profile flex justify-center py-4">
                              <label htmlFor="profile">
                              <img src={ file || avatar} alt="avatar" className={` ${styles.profile_img} ${extend.profile_img}`} />
                              </label>
                              <input type="file" id="profile" name="profile" onChange={onUpload} />
                         </div>
                         <div className="textbox flex flex-col items-center gap-6">
                              
                              <div className="name flex w-3/4 gap-10">
                              <input type="text" {...formik.getFieldProps('firstName')} className={` ${styles.textbox} ${extend.textbox}`} placeholder="firstName*"/>
                              <input type="text" {...formik.getFieldProps('lastName')} className={` ${styles.textbox} ${extend.textbox}`} placeholder="lastName*"/>
                              </div>

                              <div className="name flex w-3/4 gap-10">
                              <input type="tel" {...formik.getFieldProps('mobile')} className={` ${styles.textbox} ${extend.textbox}`} placeholder="Mobile No.*"/>
                              <input type="email" {...formik.getFieldProps('email')} className={` ${styles.textbox} ${extend.textbox}`} placeholder="Email*"/>
                              </div>

                              
                              <input type="text" {...formik.getFieldProps('address')} className={` ${styles.textbox} ${extend.textbox}`} placeholder="Address"/>
                              <button type="submit" className={styles.btn}>Update</button>
                              
                         </div>
                         <div className="text-center py-4">
                              <span className="text-gray-500">Come back later? <button onClick={userLogout} className="text-red-500" to="/">Logout</button></span>
                         </div>
                    </form>
               </div>
          </div>

     )
}