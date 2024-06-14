

interface IProduct{
    _id:number,
    name:string,
    price:number,
    image:string,
    category:{
        name:string,
        _id:number,
        image:string
    },
    desc:string,
    quantity:number
    color:string[]
    

}


export default IProduct