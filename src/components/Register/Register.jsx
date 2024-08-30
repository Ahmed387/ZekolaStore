import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import style from "./Register.module.css";
import { Helmet } from "react-helmet";

export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [usererror, setuserusererror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible1, setisVisible1] = useState(false);

  function eyetoggle() {
    setisVisible(!isVisible);
  }
  function eyetoggle1() {
    setisVisible1(!isVisible1);
  }

  let Schema = Yup.object({
    name: Yup.string()
      .min(3, "less than 3")
      .max(10, "more than 10")
      .required("name reqired please "),
    email: Yup.string().email("invalid email").required("email required"),
    password: Yup.string()
      .matches(
        `^[A-Z][a-z0-9]{3,8}$`,
        " password must start with Capital char first and length more than 3"
      )
      .required("Password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match ")
      .required("password and repassword must be the same"),
    phone: Yup.string()
      .matches("^((002))?01[0125][0-9]{8}$", "must be egyption number")
      .required("phone reqired"),
  });

  let navigate = useNavigate();
  async function handlRegister(values) {
    setisLoading(true);
    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((data) => {
        setisLoading(false);
        setuserMessage(data.data.message);
        console.log(data.data);
        navigate("/");
      })

      .catch((error) => {
        console.log("You are in catch");
        setisLoading(false);
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
    onSubmit: (values) => handlRegister(values),
  });

  useEffect(() => {
    if (formik.dirty && formik.isValid) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [formik.dirty, formik.isValid]);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto ">
        <h1 className="text-3xl text-green-600 mb-8">Register Now :</h1>
        {userMessage ? (
          <div
            className="p-4 mb-4 text-2xl text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {userMessage}
          </div>
        ) : null}
        {usererror ? (
          <div
            className="p-4 mb-4 text-2xl text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {usererror}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="on"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}

          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            NAME :
          </label>
        </div>
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
          <div className=" absolute right-6 top-2">
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
            className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            password :
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={isVisible1 ? "text" : "password"}
            name="rePassword"
            id="rePassword"
            autoComplete="on"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <div>
            <i
              onClick={() => eyetoggle1()}
              className="fa-solid fa-eye fa-lg  absolute right-6 top-5"
              style={{ color: "#000000" }}
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            rePassword :
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="on"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone :
          </label>
        </div>
        <div className="mt-10 flex justify-start items-center">
          {isLoading ? (
            <div className="ms-5">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className={`${style.D} text-white bg-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
              disabled={isDisabled}
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <Helmet>
        <meta charSet="utf-8" />
        <title>register</title>
      </Helmet>
    </>
  );
}
