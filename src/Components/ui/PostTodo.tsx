
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import Textarea from './Textarea';
import Inputs from './Inputs';
import ErrorHandler from '../Error/ErrorHandeler';
import Axiosinstance from '../../Config/AxiosConfig';
import toast from 'react-hot-toast';
import { useState } from 'react';
import validationPost from '../ValidationSchema/PostError';

import Error from './Error';
import Buttons from './Buttons';



interface ITodo {
  title: string
  description: string

}
interface IModel {
    isOpen: boolean
    setIsOpen:()=>void,
    setQueryVersion:()=>void
}
function  PostModel({isOpen,setIsOpen,setQueryVersion}:IModel) {
  
  
  let[isLoading,setIsLoading]=useState(false)
  let[todo,setTodo]=useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  })

  let closeModel=()=>{
    setTodo({
      title: "",
      description : "",
      })
    setIsOpen(false)
    
   
  }

  const onSubmit: SubmitHandler<ITodo> =async( ele )=> {

    
    setIsLoading(true)
    await Axiosinstance.post(`/todos`,{
      data:{
      title:ele.title,
      description:ele.description,
    user:[localStorage.getItem('user')]}
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
     if(res.status===200){
      
      setQueryVersion(prev=>prev+1)
       toast.success('Added successfully', {
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
     
  
  }).finally(()=>{
    setIsLoading(false)
    closeModel()
  })
  }
  const PostData = 
    <div >
      <Inputs 
        label='Title'
        name='title'
        id='title'
        placeholder='Title'
        type='text'
        register={register}
      />
      {errors.title?.message &&<Error message={errors.title?.message}/>}

      <Textarea
        
        name='description'
        id='description'
        placeholder='Description'
        type='text'
        register={register}
      />
      {errors.description?.message &&<Error message={errors.description?.message}/>}
     
    </div>
 
  
  
    return (
      <>
        
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
            <DialogPanel className="w-full max-w-md space-y-4 border bg-gray-100 p-4 rounded-md">
              <DialogTitle className="text-3xl font-bold text-slate-700">Post A New Todo </DialogTitle>
              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {PostData}
             <div className="flex space-x-2">
             <Button isLoading={isLoading} type='submit'>Post</Button>
             <Button onClick={closeModel} variant={'danger'}>Cancle</Button>
             </div>
            </div>
          </form>
        </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
  }
export default PostModel