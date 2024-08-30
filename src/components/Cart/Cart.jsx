import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  //// const [products, setproducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let {
    ClearCart,
    getcardproducts,
    Deleteitems,
    Updatecartitem,
    Totalprice,
    setTotalprice,
    setproducts,
    products,
  } = useContext(CartContext);

  async function getcardproductsinto() {
    let response = await getcardproducts();
    console.log(response?.data?.data?.products);
    setproducts(response?.data?.data?.products);
  }

  async function Deleted(productid) {
    let response = await Deleteitems(productid);
    console.log(response);
    setproducts(response?.data?.data?.products);
  }

  async function UpToData(productid, count) {
    if (count <= 0) {
      await Deleted(productid);
    } else {
      let response = await Updatecartitem(productid, count);
      console.log(response);
      setproducts(response?.data?.data?.products);
    }
  }

  async function ClearCartproduct() {
    let response = await ClearCart();
    console.log(response);
    setproducts([]);
    setTotalprice(0);
  }
  useEffect(() => {
    getcardproductsinto();
  }, []);

  return (
    <>
      {Totalprice == 0 ? (
        <Link to={"/products"}>
          <button
            className={`${style.btn31} absolute top-1/2 right-1/2 translate-x-1/2`}
          >
            <span className={`${style.textcontainer}`}>
              <span className={`${style.text}`}>Go to Fill 😍 </span>
            </span>
          </button>
        </Link>
      ) : (
        <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() =>
                          UpToData(product.product.id, product.count - 1)
                        }
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          UpToData(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price * product.count}
                  </td>
                  <td className="px-6 py-4">
                    <p
                      onClick={() => Deleted(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Totalprice > 0 ? (
            <div className="bg-gray-300 flex justify-between px-6 py-5">
              <div className="flex justify-center flex-col gap-2">
                <button
                  onClick={() => ClearCartproduct()}
                  className="text-2xl text-white bg-red-600 px-2 py-1 rounded-md"
                >
                  Clear
                </button>

                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  id="dropdownRightButton"
                  data-dropdown-toggle="dropdownRight"
                  data-dropdown-placement="right"
                  className="me-3 mb-3 md:mb-0 px-2 py-1 rounded-md text-white bg-blue-700 hover:bg-blue-800 font-medium  text-xl  text-center inline-flex items-center "
                  type="button"
                >
                  Paywith
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    id="dropdownRight"
                    className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                  >
                    <ul
                      className="py-2 text-gray-700"
                      aria-labelledby="dropdownRightButton"
                    >
                      <li>
                        <Link
                          to={"/checkout"}
                          state={{ type: "Online Payment" }}
                          className="block text-center  text-xl hover:text-white hover:bg-gray-600 text-black font-bold  px-2 py-1 rounded-md "
                        >
                          Online
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/checkout"}
                          state={{ type: "Cash Payment" }}
                          className="block text-xl text-center hover:bg-gray-600 hover:text-white text-black font-bold  px-2 py-1 rounded-md "
                        >
                          Cash
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-evenly gap-x-6 w-full ">
                <div className="text-2xl text-black">ToTal = </div>

                <div className="text-2xl text-black ">{Totalprice} EGP </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
    </>
  );
}
