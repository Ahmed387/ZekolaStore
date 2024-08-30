import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import style from "./Login.module.css";
import { TokenContext } from "../../TokenContext/Tokencontext";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { useDispatch } from "react-redux";
import { getproducttowishlist } from "../../Redux/Productslice";

export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [usererror, setuserusererror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);

  let { setToken } = useContext(TokenContext);
  let { getcardproducts, setproducts } = useContext(CartContext);
  let dispatch = useDispatch();

  const [isVisible, setisVisible] = useState(false);

  async function getcardproductsinto() {
    let response = await getcardproducts();
    console.log(response?.data?.data?.products);
    setproducts(response?.data?.data?.products);
  }

  let Schema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email required"),
    password: Yup.string()
      .matches(
        `^[A-Z][a-z0-9]{3,8}$`,
        " password must start with Capital char first and length more than 3"
      )
      .required("Password required"),
  });

  let navigate = useNavigate();

  async function handlLogin(values) {
    setisLoading(true);
    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        setisLoading(false);
        setuserMessage(data.data.message);
        setToken(data.data.token);
        console.log(data.data);
        localStorage.setItem("userToken", data.data.token);
        localStorage.getItem("medhat");
        getcardproductsinto();
        dispatch(getproducttowishlist());
        navigate("/");
      })
      .catch((error) => {
        setisLoading(false);
        setisLoading(false);
        console.log("You are in catch");
        setuserusererror(error.response.data.message);
        console.log(error.respond);
      });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      name: "",
      phone: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => handlLogin(values),
  });

  useEffect(() => {
    if (formik.dirty && formik.isValid) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [formik.dirty, formik.isValid]);
  function eyetoggle() {
    setisVisible(!isVisible);
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto mt-20">
        <h1 className="text-3xl text-green-600 mb-8">Login Now :</h1>
        {userMessage ? (
          <div
            className=" text-center p-4 mb-4 text-3xl text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {userMessage}
          </div>
        ) : null}
        {usererror ? (
          <div
            className=" text-center p-4 mb-4 text-3xl text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {usererror}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="on"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <div className=" absolute right-6 top-1">
            <i
              onClick={() => eyetoggle()}
              className="fa-solid fa-eye fa-lg "
              style={{ color: "#000000" }}
            />
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            password :
          </label>
        </div>

        <div className="mt-10 flex justify-between items-center">
          {isLoading ? (
            <div className="ms-5">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className={`${style.D}  text-white bg-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 `}
              disabled={!(formik.isValid && formik.dirty) && isDisabled}
            >
              Submit
            </button>
          )}
        </div>
        <Link to={"/forgetpassword"}>
          <h1 className="text-2xl font-semibold hover:text-green-600 my-28 text-center hover:underline hover:underline-offset-[20px]">
            forget My password ?
          </h1>
        </Link>
      </form>
    </>
  );
}
