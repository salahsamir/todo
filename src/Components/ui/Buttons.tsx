
import { motion } from "framer-motion"
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    state?:boolean
}
function Buttons({children,state, ...rest}: IButton ) {
  return (
    <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
     {...rest}
      type="submit"
      disabled={state}
  >
    

    {children}
  </motion.button>
  )
}

export default Buttons