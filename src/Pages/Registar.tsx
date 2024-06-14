import { Link, Navigate, useNavigate } from "react-router-dom";
import { RegistarData } from "../Components/Data/RegisterData";
import Inputs from "../Components/ui/Inputs";
import Buttons from "../Components/ui/Buttons";
import Todo from "../assets/Todo.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import validationRegistar from "../Components/ValidationSchema/Registar";
import Error from "../Components/ui/Error";
import { useState } from "react";
import Axiosinstance from "../Config/AxiosConfig";
import toast from "react-hot-toast";
import LoadingSpinner from "../Components/ui/LoadingSpinner";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export default function Registar() {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>(
    {
      resolver: yupResolver(validationRegistar)
    }
  )

  let [load,setLoading] = useState<Boolean>(false)
  const navigate = useNavigate();


  const onSubmit: SubmitHandler<IFormInput> =async( data )=> {
    setLoading(true)
    try {
      await Axiosinstance.post(`/auth/local/register`,data).then(res => {
        
        if(res?.status === 200){
            toast.success('Account created successfully.', {
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
              navigate('/login')
            }, 1500);
        }
        
      })

      
    } 
    catch (error) {
     
      
        toast.error(error.response.data.error.message,{
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
        
      
    }
    finally{
      setLoading(false)
    }
  };

  const RenderRegistarData = RegistarData.map((item) => (
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
            Create A New Account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {RenderRegistarData}
              <Buttons state={load}>{load ?<LoadingSpinner/>
: "Registar"}</Buttons>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="font-semibold leading-6 px-1 text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
