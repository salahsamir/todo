
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { DataTodo } from '../Data/EditeTodo'
import Inputs from './Inputs'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import validationEdite from '../ValidationSchema/Edite';
import Buttons from './Buttons';
import Button from './Button';
interface IModel {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function Model({isOpen,setIsOpen}:IModel) {
  const { register, handleSubmit,formState: { errors } } = useForm(
    {
      resolver: yupResolver(validationEdite)
    }
  )
  
    return (
      <>
        
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-gray-100 p-4 rounded-md">
              <DialogTitle className="text-3xl font-bold text-slate-700">Edite Todo</DialogTitle>
                <input value="Edite Todo"></input>
              
              <div className="flex space-x-2 mt-2">
                <Button>Update</Button>
                <Button variant={"cancel"} onClick={() => setIsOpen(false)}>Cancel</Button>

              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
  }
export default Model