
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import validationEdite from '../ValidationSchema/Edite';

import Button from './Button';
import Textarea from './Textarea';
import Inputs from './Inputs';

import ErrorHandler from '../Error/ErrorHandeler';
import Axiosinstance from '../../Config/AxiosConfig';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ITodo {
  title: string
  description: string
  id: string
}
interface IModel {
    isOpen: boolean
    setIsOpen:()=>void,
    todo:ITodo,
    setTodo:()=>void,
    setQueryVersion:()=>void
}
function Model({isOpen,setIsOpen,todo,setTodo,setQueryVersion}:IModel) {
  

  let[isLoading,setIsLoading]=useState(false)
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationEdite),
  })

  let closeModel=()=>{
    setIsOpen(false)
    setTodo({
      title: "",
      description: "",
      id: ""})
   
  }
  let onChangeHandel=(e:ChangeEvent<HTMLInputElement>)=>{
    setTodo({...todo,[e.target.name]:e.target.value})

  }
  const onSubmit: SubmitHandler<ITodo> =async( ele )=> {
    setIsLoading(true)
    await Axiosinstance.put(`/todos/${ele.id}`,{
      data:{
      title:ele.title,
      description:ele.description}
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
     if(res.status===200){
      setQueryVersion(prev=>prev+1)
       toast.success('update successfully', {
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

  
  
    return (
      <>
        
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
            <DialogPanel className="w-full max-w-md space-y-4 border bg-gray-100 p-4 rounded-md">
              <DialogTitle className="text-3xl font-bold text-slate-700">Edite Todo </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Inputs 
                value={todo.title}
        label="Title"
        name="title"
        id="title"
        placeholder="Title"
        type="text"
        register={register}
        onChange={onChangeHandel}
      />
       {errors.title?.message &&<ErrorHandler message={errors.title.message}/>}
                <Textarea  value={todo.description} {...register("description")} onChange={onChangeHandel}  name="description" id="description" placeholder="Description" register={register}/>
                {errors.description?.message && <ErrorHandler message={errors.description.message}/>}
                <div className="flex space-x-2 mt-2">
                <Button type="submit" onClick={() => onSubmit(todo)} isLoading={isLoading}>Update</Button>
                <Button variant={"cancel"} onClick={() => closeModel()}>Cancel</Button>

              </div>
                </form>
             
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
  }
export default Model