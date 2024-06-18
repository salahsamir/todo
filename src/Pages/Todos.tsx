

import { useState } from "react";

import Model from "../Components/ui/Model";

import UseAuthanticationHook from "../assets/Hooks/UseAuthanticationHook"
import Button from "../Components/ui/Button";
import ModelDelete from "../Components/ui/DeleteModel";
import { Skelton } from "../Components/ui/Skelton";
import PostTodo from "../Components/ui/PostTodo";
import Axiosinstance from "../Config/AxiosConfig";
import { faker } from '@faker-js/faker';
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
  let [queryVersion,setQueryVersion]=useState(1)

  const {isPending, error, data}=UseAuthanticationHook({queryKey:['todos',`${queryVersion}`],url:"/users/me?populate=todos",config:{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }})
 
  let generateTodos=async()=>{
    for (let i = 0; i <10; i++) {
      await Axiosinstance.post(`/todos`,{
        data:{
        title:faker.word.words(5),
        description:faker.word.words(20),
      user:[localStorage.getItem('user')]}
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      }).then(res=>{
       console.log(res)
      })
      .catch(err=>{
           console.log(err)
      })
      
    }
  }

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
       <Button onClick={()=>{generateTodos()}}  className="w-fit  my-5 "   >Generate Todos</Button>
       <Button onClick={()=>{setIsOpenPost(true)}}  className="w-fit  my-5 " variant={"outline"}  >Post Todo</Button>

       </div>

            {data?.todos?.length?
(
       <>
       
        <div className=" ">
          {data.todos.map((todo: any) => {
            return (
              <div key={todo.id} className=" bg-base-100 shadow-xl p-3 w-3/4 mx-auto my-2 even:bg-slate-200 rounded-lg ">
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
             <PostTodo isOpen={isOpenPost} setIsOpen={setIsOpenPost} setQueryVersion={setQueryVersion} />
            <Model isOpen={isOpen} setIsOpen={setIsOpen} todo={todo} setTodo={setTodo} setQueryVersion={setQueryVersion}/>
            <ModelDelete isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} id={IdDelete} setIdDelete={setIdDelete} setQueryVersion={setQueryVersion} />
    </div>
  )
}

export default Todos
