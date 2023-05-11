import React, { useEffect, useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/store";
import styles from '../styles/username.module.css';
import { generateOTP, verifyOTP } from "../helper/helper";

export default function Recovery() {

     const { username } = useAuthStore(state => state.auth)
     const [OTP, setOTP] = useState()
     const navigate = useNavigate()

     useEffect(() => {
          generateOTP(username)
          .then(OTP => {
               console.log(OTP);
               if(OTP) return toast.success('OTP has been send to your email');
               return toast.error('Problem while generating OTP!');
          })
     }, { username })

     async function onSubmit(e){
          e.preventDefault()

          try {
               let { status } = await verifyOTP({ username, code: OTP })
               if(status === 201){
                    toast.success('Verify successfully');
                    return navigate('/reset');
               }
          } catch (error) {
          return toast.error("Wrong OTP! Check your email again");
          }          
     }

     //handler of resending OTP
     function resendOTP(){
          let sendPromise = generateOTP(username)
          toast.promise(sendPromise, {
               loading: 'Sending',
               success: <b>New OTP has been resent to your email</b>,
               error: <b>Could not send OTP!</b>
          })
          sendPromise.then(OTP => {
               console.log(OTP);
          })
     }
     return (
     
          <div className="container mx-auto" onSubmit={onSubmit}>
               <div className="flex justify-center items-center h-screen">
               <Toaster position="top-center" reverseOrder={false}></Toaster>
               <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                         <h4 className="text-5xl font-bold">Recovery</h4>
                         
                    </div>
                    <form className="pt-20" >
                         <div className="textbox flex flex-col items-center gap-6">
                              <div className="input text-center">
                                   <span className="py-4 text-sm text-left text-gray-500">Enter 6 digit OTP sent to your email address</span>
                                   <input type="text" onChange={(e) => setOTP(e.target.value)} className={styles.textbox} placeholder="OTP" />
                              </div>
                              <button type="submit" className={styles.btn}>Recover</button>
                         </div>
                    </form>
                    <div className="text-center py-4">
                              <span className="text-gray-500">Can't get OTP?<button className="text-blue-500" onClick={resendOTP}>Resend</button></span>
                         </div>
               </div>
               </div>
          </div>

     )
}