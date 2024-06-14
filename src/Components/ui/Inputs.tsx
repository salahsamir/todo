import { Field, Input, Label } from '@headlessui/react';

interface IProduct extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  type: string;
  register: any;
}

export default function Inputs({ label, name, id, placeholder, type, register, ...rest }: IProduct) {
  return (
    <div className="w-full max-w-md px-1 py-1">
      <Field>
        <Label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Label>
        <div className="mt-2">
          <Input
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            {...rest}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </Field>
    </div>
  );
}


// import { Field, Input, Label } from '@headlessui/react';
// import { Ref, forwardRef } from 'react';

// interface IProduct extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   name: string;
//   id: string;
//   placeholder: string;
//   type: string;
//   register?: any;
// }

// let inputs=forwardRef(({ label, name, id, placeholder, type, ...rest }: IProduct, ref:Ref<HTMLInputElement>)=>{
//   return (
//    <div className="w-full max-w-md px-1 py-1">
//      <Field>
//        <Label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
//          {label}
//        </Label>
//        <div className="mt-2">
//          <Input
//           ref={ref}
//            name={name}
//            id={id}
//            type={type}
//            placeholder={placeholder}
          
//            {...rest}
//            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//          />
//        </div>
//      </Field>
//    </div>
//  );
// })

// export default inputs