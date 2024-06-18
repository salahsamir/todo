import Paginator from "../Components/ui/Paginator"
import { Skelton } from "../Components/ui/Skelton"
import UseAuthanticationHook from "../assets/Hooks/UseAuthanticationHook"


function Paginate() {
  const {isPending, error, data}=UseAuthanticationHook({queryKey:['pagination'],url:"/todos"})

   
  if (isPending) return  <Skelton/>

  if (error) return 'An error has occurred: ' + error.message
  
 

  return (
    <div>
    {data?.data?.length?
(
       <>
       
        <div className=" ">
          {data.data.map((todo: any) => {
            return (
              <div key={todo.id} className=" bg-base-100 shadow-xl p-1 w-3/4 mx-auto my-2 even:bg-slate-200 rounded-lg ">
                <div className="flex justify-between   items-center ">
                 <div className="flex flex-col space-y-1">
                 <h5 className="text-1xl text-blue-800">{todo.attributes.title}</h5>
                 <p className="text-gray-500">{todo.attributes.description}</p>
                 </div>
                
                </div>
              </div>
            )
          })}
        <Paginator/>

        </div>
       
       
       </>)
            :("No Todo Found")}

    </div>
  )
}

export default Paginate