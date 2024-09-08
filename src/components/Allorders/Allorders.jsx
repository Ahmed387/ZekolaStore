import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Allorders() {
  const [products, setproducts] = useState([]);
  let { getcardproducts, Totalprice, ClearCart } = useContext(CartContext);

  async function getcardproductsinto() {
    let response = await getcardproducts();
    console.log(response?.data?.data?.products);
    setproducts(response?.data?.data?.products);
  }

  useEffect(() => {
    getcardproductsinto();
  }, []);

  useEffect(() => {
    ClearCart();
  }, [Totalprice]);

  function showstars(x) {
    let stars = [];
    for (let i = 1; i <= parseInt(x); i++) {
      stars.push(
        <svg
          className=" w-4 h-4 text-yellow-300"
          aria-hidden="true"
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  }

  return (
    <>
      <h1 className="underline  text-center text-red-500 underline-offset-[14px] text-3xl font-semibol mb-5">
        Congratulation
      </h1>
      <div className="mx-auto flex justify-center mt-40">
        <Link to={"/products"}>
          <button className="bg-blue-500  text-center text-white px-7 py-3 rounded-lg mt-6">
            Go to Fill 😍
          </button>
        </Link>
      </div>
      <div className="container mx-auto mt-10 ">
        <div className="flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
          {products.map((product) => (
            <div
              key={product.product.id}
              className="transition-all duration-200 mb-7 hover:md:mx-3 hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/5 bg-white border border-gray-300 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
            >
              <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                <img
                  className="rounded-t-lg pt-1 h-[13rem]"
                  loading="lazy"
                  src={product.product.imageCover}
                  alt="product image"
                />
              </div>

              <div className=" pb-5 text-center">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-2">
                  {product.product.category.name}
                </h5>

                <div className="flex items-center justify-center mt-2.5 mb-3">
                  <div className="flex items-center">
                    {showstars(product.product.ratingsAverage)}
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                    {product.product.ratingsAverage}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white ps-2">
                    {"$" + product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Congratulation</title>
      </Helmet>
    </>
  );
}
