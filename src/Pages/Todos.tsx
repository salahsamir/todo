

import { useState } from "react";
import Buttons from "../Components/ui/Buttons"
import Model from "../Components/ui/Model";

import UseAuthanticationHook from "../assets/Hooks/UseAuthanticationHook"


function Todos() {
  const {isPending, error, data}=UseAuthanticationHook({queryKey:['todos'],url:"/users/me?populate=todos",config:{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }})
 

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  
  let [isOpen, setIsOpen] = useState(false)

  function EditeOpen() {
    setIsOpen(true)}

  return (
  

    <div>
            {data.todos.length?

       <>
       <h2 className="text-3xl font-bold text-center my-2">Your Todos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 space-x-2 text-center my-3 ">
          {data.todos.map((todo: any) => {
            return (
              <div key={todo.id} className="card bg-base-100 shadow-xl p-3 even:bg-slate-200">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{todo.title}</h2>
                  <p>{todo.description}</p>
                  <div className="flex space-x-2">
                    <Buttons onClick={EditeOpen} >Edite</Buttons>
                    <Buttons >Delete</Buttons>
                    
                  </div>
                </div>
              </div>
            )
          })}


        </div>
       
       
       </>
            :"No Todo Found"}

            <Model isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default Todos