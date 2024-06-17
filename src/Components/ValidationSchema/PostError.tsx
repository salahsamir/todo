

import * as Yup from 'yup';

const validationPost = Yup.object({
    title: Yup.string().min(3, 'Title must be at least 3 characters').max(20, 'Title must be at most 20 characters').required('Title is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters').max(100, 'Description must be at most 100 characters').required('Description is required'),
   
  }).required()
  export default validationPost