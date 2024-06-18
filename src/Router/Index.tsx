import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
 import Layout from "../Pages/Layout";
import Login from "../Pages/Login";
import Registar from "../Pages/Registar";
import Index from "../Pages/Index";
import ProductRoute from "../Components/Auth/ProtectedRoute"
import Paginate from "../Pages/Paginate";
import ErrorHandler from "../Components/Error/ErrorHandeler";
import PageNotFound from "../Pages/PagesNotFound";


export let router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>} errorElement={<ErrorHandler />}  >
                <Route index element={<ProductRoute  children={<Index />} />} />
                <Route path="login" element={<Login />} />
                <Route path="registar" element={<Registar />} />
                <Route path="profile" element={<Paginate />} />
                <Route path="*" element={<PageNotFound />} />


            </Route>
        </>
    )
)