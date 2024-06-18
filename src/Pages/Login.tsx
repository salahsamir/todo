import { Link, useNavigate } from "react-router-dom";

import Inputs from "../Components/ui/Inputs";
import Buttons from "../Components/ui/Buttons";
import Todo from "../assets/Todo.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Error from "../Components/ui/Error";
import { useState } from "react";
import Axiosinstance from "../Config/AxiosConfig";
import toast from "react-hot-toast";
import validationLogin from "../Components/ValidationSchema/Login";
import { LoginData } from "../Components/Data/LoginData";
import LoadingSpinner from "../Components/ui/LoadingSpinner";
interface IFormInput {
  
  identifier: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>(
    {
      resolver: yupResolver(validationLogin)
    }
  )

  let [load,setLoading] = useState<Boolean>(false)

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> =async( data )=> {
    setLoading(true)
   await Axiosinstance.post(`/auth/local`,data).then(res=>{
     localStorage.setItem('token',res.data.jwt)
     localStorage.setItem('user',res.data.user.id)
    if(res.status===200){
      toast.success('Login successfully', {
        style: {
          border: '1px solid #13204a',
          padding: '16px',
          color: '#11073d',
        },
        iconTheme: {
          primary: '#13204a',
          secondary: '#FFFAEE',
        },
      })
      setTimeout(() => {
        navigate('/')
      }, 1500);
     
     }
   }).catch(err=>{
    toast.error(err.response.data.error.message,{
      style: {
        border: '1px solid #13204a',
        padding: '16px',
        color: '#11073d',
      },
      iconTheme: {
        primary: '#13204a',
        secondary: '#FFFAEE',
      },
    })
    
   }).finally(() => {
    setLoading(false)})
  };
  const RenderLoginData = LoginData.map((item) => (
    <div key={item.id}>
      <Inputs 
        label={item.label}
        name={item.name}
        id={item.id}
        placeholder={item.placeholder}
        type={item.type}
        register={register}
      />
      {errors[item.name]?.message &&<Error message={errors[item.name]?.message}/>}
     
    </div>
  ));

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-5 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 rounded-full w-auto"
            src={Todo}
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {RenderLoginData}
              <Buttons state={load}>{load ?<LoadingSpinner/>
: "Login"}</Buttons>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link to="/registar" className="font-semibold leading-6 px-1 text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
