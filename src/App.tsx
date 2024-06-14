import { RouterProvider } from "react-router-dom"
import { router } from "./Router/Index"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
    
    
    <RouterProvider router={router}/>
    <div><Toaster/></div>
    </>
  )
}

export default App