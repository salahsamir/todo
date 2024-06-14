

import * as Yup from 'yup';

const validationEdite = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string()
   
  });
  export default validationEdite