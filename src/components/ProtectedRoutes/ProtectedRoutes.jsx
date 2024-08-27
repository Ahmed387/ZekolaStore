import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
  if (localStorage.getItem("userToken")) 
    {
    console.log(`From protected Routes ${props}`);
    return props.children;
    }
     else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
