
import * as Yup from 'yup';

const validationLogin = Yup.object().shape({
  identifier: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
   
      .required('Password is required'),
  });
  export default validationLogin