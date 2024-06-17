

import { useState } from "react";
import Buttons from "../Components/ui/Buttons"
import Model from "../Components/ui/Model";

import UseAuthanticationHook from "../assets/Hooks/UseAuthanticationHook"
import Button from "../Components/ui/Button";
import ModelDelete from "../Components/ui/DeleteModel";
import { Skelton } from "../Components/ui/Skelton";
import PostTodo from "../Components/ui/PostTodo";

interface ITodo {
  title: string
  description: string
  id: string
}
function Todos() {
  let [todo, setTodo] = useState<ITodo>({
    title: "",
    description: "",
    id: ""

  })
  let [isOpen, setIsOpen] = useState(false)
  let [isOpenDelete, setIsOpenDelete] = useState(false)
  let [isOpenPost, setIsOpenPost] = useState(false)
  let [IdDelete, setIdDelete] = useState('')


  const {isPending, error, data}=UseAuthanticationHook({queryKey:['todos',`${todo.id}`,`${IdDelete}`],url:"/users/me?populate=todos",config:{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }})
 

  function DeleteOpen(id:string) {
    setIsOpenDelete(true)
     setIdDelete(id)
  
  }


  function EditeOpen(data:ITodo) {
    setIsOpen(true)
    setTodo(data)
  
  }

 
  if (isPending) return  <Skelton/>

  if (error) return 'An error has occurred: ' + error.message
  
 

  return (
  

    <div>
      <div className="flex justify-between items-center">
       <h2 className="text-5xl text-blue-900 font-bold  my-2">Your Todos</h2>
       <Button onClick={()=>{setIsOpenPost(true)}}  className="w-fit  my-5 " variant={"outline"}  >Post Todo</Button>
       </div>

            {data?.todos?.length?
(
       <>
       
        <div className=" ">
          {data.todos.map((todo: any) => {
            return (
              <div key={todo.id} className=" bg-base-100 shadow-xl p-3 w-3/4 mx-auto my-2 even:bg-slate-200 rounded-lg hover:scale-105">
                <div className="flex justify-between   items-center ">
                 <div className="flex flex-col space-y-2">
                 <h2 className="text-3xl text-blue-800 font-bold">{todo.title}</h2>
                 <p className="text-gray-500">{todo.description}</p>
                 </div>
                  <div className=" flex space-x-2 ">
                    <Button onClick={()=>{EditeOpen(todo)}} >Edite</Button>
                    <Button variant={"danger"}  onClick={()=>{DeleteOpen(todo.id)}}>Remove</Button>
                    
                  </div>
                </div>
              </div>
            )
          })}


        </div>
       
       
       </>)
            :("No Todo Found")}
             <PostTodo isOpen={isOpenPost} setIsOpen={setIsOpenPost} t/>
            <Model isOpen={isOpen} setIsOpen={setIsOpen} todo={todo} setTodo={setTodo}/>
            <ModelDelete isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} id={IdDelete} setIdDelete={setIdDelete} />
    </div>
  )
}

export default Todos
