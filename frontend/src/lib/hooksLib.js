import { useState } from "react";

export const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);
  /* The initial state in our case is an object 
 where the keys are the ids of the form fields 
 and the values are what the user enters. */
  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
};

// const a = () => {
//     return [b, console.log('hi')];
// }

// c = a();
// c[1]
