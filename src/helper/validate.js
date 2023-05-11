import { toast } from "react-hot-toast";
import { authenticate } from "./helper.js";
/** validate login page username */
export async function usernameValidate(values){
     const errors = usernameVerify({}, values);

     if(values.username){
          //check user existence
          const { status } = await authenticate(values.username);
          if(status !== 200){
               errors.exist = toast.error("User doesn't exist...!")
          }
     }
     return errors;
}
/** validate password */
export async function passwordValidate(values){
     const errors = passwordVerify({}, values);

     return errors;
}
/** validate reset password */
export async function resetPasswordValidation(values){
     const errors = passwordVerify({}, values);

     if(values.password !== values.confirm_pwd){
          errors.exist = toast.error("Passwords do not match...!")
     }
     return errors;
}
/** validate register form */
export async function registerValidation(values){
     const errors = usernameVerify({}, values);
     passwordVerify(errors, values);
     emailVerify(errors, values);
     return errors;
      
}
/** validate profile page */
export async function profileValidation(values) {
     const errors= emailVerify({}, values);

     return errors;
}

/** verify password */
function passwordVerify(error= {}, values) {
  if(!values.password){
     error.password = toast.error("Password required...!");
  }
  else if(values.password.includes(" ")){
     error.password = toast.error("Wrong password...!");
  }
  else if(values.password.length < 4){
     error.password = toast.error("Password must be at least 5 characters...!");
  }
  
  return error;
}
/** verify username */

function usernameVerify(error = {}, values){
     if(!values.username){
          error.username = toast.error( "Username Required...!");
     }
     else if(values.username.includes(" ")){
          error.username = toast.error("Invalid Username...!")
     }

     return error;
}
/** verify email */
function emailVerify(error = {}, values) {
     if(!values.email){
     error.email = toast.error("Email required...!");
     }
     else if(values.email.includes(" ")){
          error.email = toast.error("Wrong email...!");
       }
     return error
}