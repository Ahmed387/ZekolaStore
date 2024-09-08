import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
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
    setproducts(response?.data?.data?.products);
  }

  async function Deleted(productid) {
    let response = await Deleteitems(productid);
    setproducts(response?.data?.data?.products);
  }

  async function UpToData(productid, count) {
    if (count <= 0) {
      await Deleted(productid);
    } else {
      let response = await Updatecartitem(productid, count);
      setproducts(response?.data?.data?.products);
    }
  }

  async function ClearCartproduct() {
    let response = await ClearCart();
    setproducts([]);
    setTotalprice(0);
  }

  useEffect(() => {
    getcardproductsinto();
  }, []);

  return (
    <>
      {Totalprice == 0 ? (
        <div className="mx-auto flex justify-center mt-40">
          <Link to={"/products"}>
            <button className="bg-blue-500  text-center text-white px-7 py-3 rounded-lg mt-6">
              Go to Fill 😍
            </button>
          </Link>
        </div>
      ) : (
        <div className=" container  mx-auto text-center flex justify-center flex-col  shadow-md sm:rounded-lg px-4 md:px-0">
          <table className="md:min-w-[50rem] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
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
                  <td className="p-2 md:p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-12 md:w-16 max-w-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          UpToData(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-gray-500 bg-white border rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        type="button"
                      >
                        <span className="sr-only">Decrease</span>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 18 2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1h16" />
                        </svg>
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          UpToData(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-gray-500 bg-white border rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        type="button"
                      >
                        <span className="sr-only">Increase</span>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}
                  </td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price * product.count}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => Deleted(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mx-auto min-w-[32rem] px-4 md:px-0">
            {Totalprice > 0 ? (
              <div className="bg-white flex flex-col  w-full   gap-4 md:gap-6 items-center justify-center px-4 md:px-6 py-6 rounded-lg shadow-lg mt-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    Total:
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-black">
                    {Totalprice} EGP
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <button
                    onClick={() => ClearCartproduct()}
                    className="text-lg md:text-xl text-white bg-red-600 px-4 md:px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
                  >
                    Clear Cart
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="px-4 md:px-6 py-3 text-lg md:text-xl text-white bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center"
                    >
                      Pay with
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 ml-2"
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
                      <div className="absolute z-10 left-full bottom-7 ml-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <ul className="py-2">
                          <li>
                            <Link
                              to={"/checkout"}
                              state={{ type: "Online Payment" }}
                              className="block text-lg text-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-t-md"
                            >
                              Online
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/checkout"}
                              state={{ type: "Cash Payment" }}
                              className="block text-lg text-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-b-md"
                            >
                              Cash
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
    </>
  );
}
