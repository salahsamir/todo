import { useQuery } from "@tanstack/react-query"
import { AxiosRequestConfig } from "axios"
import Axiosinstance from "../../Config/AxiosConfig"

interface IUseAuthanticationHook {
  queryKey:string[],
  url:string,
  config?:AxiosRequestConfig

}
function UseAuthanticationHook({queryKey,url,config}:IUseAuthanticationHook) {
  return useQuery({
    queryKey,
    queryFn:async () =>
           await Axiosinstance.get(url,config).then((res) =>
        res.data
      ),
  }) 

}

export default UseAuthanticationHook