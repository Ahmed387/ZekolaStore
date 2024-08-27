import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import style from "./ForgetPassword";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  let navigate = useNavigate();
  let Schema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => Verify(values.email),
  });

  useEffect(() => {
    if (formik.dirty && formik.isValid) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [formik.dirty, formik.isValid]);

  async function Verify(EEmail) {
    setisLoading(true);
    try {
      setisLoading(false);
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: EEmail }
      );

      navigate("/verifycode");
      return response;
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <h1 className=" mt-20 mb-10 text-2xl text-black">Enter your Email :</h1>
        <form className=" max-w-xl mx-auto " onSubmit={formik.handleSubmit}>
          <div className="relative">
            <span className="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              autoComplete="on"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              E-mail
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
        </form>
      </div>
    </>
  );
}
