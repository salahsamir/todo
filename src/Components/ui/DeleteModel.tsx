import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import Button from './Button';
import Axiosinstance from '../../Config/AxiosConfig';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface IAdd {
  
  isOpen: boolean,
  setIsOpen:()=>void
  id: string
  setIdDelete:()=>void
}

export default function ModelDelete({  isOpen,setIsOpen , id,setIdDelete }: IAdd) {
   

 let [isLoading, setIsLoading] = useState<Boolean>(false)
  let close = () => {
    setIsOpen(false);
  }

  const onDelete =async( id )=> {
    setIsLoading(true)
    await Axiosinstance.delete(`/todos/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
     if(res.status===200){
       toast.success('Deleted successfully', {
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
    setIdDelete('')
    close()
  })
  }
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Remove Item
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white">
                    Are you sure you want to delete this product?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aliquid esse quae consequuntur corrupti autem atque est ea ad ducimus!
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button variant="danger" isLoading={isLoading}  onClick={()=>onDelete(id)}>Yes ,Remove</Button>
                    <Button variant="cancel"  onClick={close}>Cancel</Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
