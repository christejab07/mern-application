import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from '../styles/username.module.css';
import { resetPasswordValidation } from "../helper/validate";
import { useAuthStore } from '../store/store'
import { resetPassword } from "../helper/helper";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from '../hooks/fetch.hook'

export default function Reset() {

     const { username } = useAuthStore(state => state.auth);
     const navigate = useNavigate()
     const [{ isLoading, apiData, status, serverError}] = useFetch('createResetSession')

     const formik = useFormik({
          initialValues: {
               password: '',
               confirm_pwd: ''
          },
          validate: resetPasswordValidation, 
          validateOnBlur: false,
          validateOnChange: false,
          onSubmit: async (values) =>{
               console.log(values);
               let resetPromise = resetPassword({ username, password: values.password })

               toast.promise(resetPromise, {
                    loading: 'Updating...!',
                    success: <b>Reset successful</b>,
                    error: <b>Couldn't reset!</b>
               })
               resetPromise.then(() =>{ navigate('/password') })
          }
     })
     if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>
     if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>
     if(status && status !==201 ) return <Navigate to={'/password'} replace={true}></Navigate>
     return (
          <div className="container mx-auto justify-center items-center flex mt-20 mb-20 h-auto">
               <Toaster position="top-center" reverseOrder={false}></Toaster>
               <div className={styles.glass} style={{width: "50%"}} >
                    <div className="title flex flex-col items-center">
                         <h4 className="text-5xl font-bold">Reset</h4>
                         <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                              Enter your password
                         </span>
                    </div>
                    <form className="py-20" onSubmit={formik.handleSubmit}>
                         <div className="textbox flex flex-col items-center gap-6">
                              <input type="password" {...formik.getFieldProps('password')} className={styles.textbox} placeholder="password"/>
                              <input type="password" {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} placeholder="Confirm password"/>
                              <button type="submit" className={styles.btn}>Reset</button>
                         </div>
                    </form>
               </div>
               
          </div>

     )
}