

interface IAlerts {
  message: string

}
function Error({ message}: IAlerts) {
  return (
    <>
      <div className="text-red-500 text-sm p-2 bg-slate-800 rounded-lg "> {message}</div>
    </>
  )
}

export default Error