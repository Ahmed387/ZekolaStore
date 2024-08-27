import { useFormik } from "formik";
import style from "./Checkout.module.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useLocation } from "react-router-dom";


export default function Checkout() {
  const [isDisabled, setisDisabled] = useState(true);
  let { state } = useLocation();
  const [paymenttype, setpaymenttype] = useState(null);

  let { Payment, CashPayment } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.details) {
        errors.details = "Details are required";
      }
      if (!values.phone) {
        errors.phone = "Phone number is required";
      }
      return errors;
    },
    onSubmit: (values) => Paymentonline(values),
  });
  useEffect(() => {
    const Allinputs =
      formik.values.details && formik.values.phone && formik.values.city;
    if (Allinputs) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [formik.dirty, formik.isValid]);

  useEffect(() => {
    setpaymenttype(state.type);
  }, []);

  async function Paymentonline(values) {
    if (paymenttype == "Online Payment") {
      await Payment(values);
    } else {
      await CashPayment(values);
    }
  }

  return (
    <>
      <h1 className="text-2xl  font-bold text-center text-green-600">
        {paymenttype}
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto mt-10 ">
        <div className="relative z-0 min-w-full me-10 mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            autoComplete="on"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" block text-xl py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.details && formik.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.details}
            </div>
          ) : null}
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details :
          </label>
        </div>
        <div className="relative z-0 min-w-full me-10 mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="on"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block text-xl py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.city && formik.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {formik.errors.city}
            </div>
          ) : null}
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City :
          </label>
        </div>

        <div className="relative z-0 min-w-full me-10 mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="on"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block text-xl py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
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
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone :
          </label>
        </div>

        <button
          type="submit"
          className={`${style.D}  text-white bg-green-700 font-medium rounded-lg text-sm min-w-full mt-12 px-5 py-2.5 `}
          disabled={!(formik.isValid && formik.dirty) && isDisabled}
        >
          PayNow
        </button>
      </form>

    </>
  );
}
