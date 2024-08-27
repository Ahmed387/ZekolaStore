import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Branddetails.module.css";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
export default function Branddetails() {
  let { AddProductToCart } = useContext(CartContext);

  async function AddToCart(productid) {
    let response = await AddProductToCart(productid);
    console.log(response);
  }
  const [items, setItems] = useState([]);
  const { id } = useParams();
  console.log("Brand ID:", id);

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

  async function getRelatedProducts(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        const related = response?.data?.data?.filter(
          (item) => item.brand._id === id
        );
        setItems(related);
        return related || [];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let { data } = useQuery({
    queryKey: ["related", id],
    queryFn: () => getRelatedProducts(id),
  });
  console.log(data);

  return (
    <>
      {/* items.length */}
      {items.length > 0 ? (
        <div className="container mx-auto mt-8   ">
          <div className="flex justify-center items-center text-center gap-1  mx-auto  ">
            {items.map((product) => (
              <div
                key={product._id}
                className="  md:transition-all md:duration-200 mb-7 hover:md:mx-3 hover:lg:mx-6 md:hover:scale-110 md:ease-linear w-full md:w-1/3 bg-white border border-gray-300 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
              >
                <div className="flex justify-center items-center w-[200px] pt-3 text-center mx-auto">
                  <img
                    className="rounded-t-lg pt-1 h-[13rem] w-fit "
                    loading="lazy"
                    src={product.imageCover}
                    alt="product image"
                  />
                </div>

                <div className="pb-5 text-center">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-2">
                    {product.category.name}
                  </h5>

                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h5>
                  <div className="flex items-center justify-center mt-2.5 mb-3">
                    <div className="flex items-center">
                      {showstars(product.ratingsAverage)}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white ps-2">
                      {"$" + product.price}
                    </span>
                    <button
                      onClick={() => AddToCart(product._id)}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 me-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-screen flex justify-center items-center flex-col gap-3">
            <h1 className="text-2xl font-semibold">No product Available </h1>
            <Link to={"/brands"}>
              <button className={`${style.btn31} `}>
                <span className={`${style.textcontainer}`}>
                  <span className={`${style.text}`}>Click to See Brands</span>
                </span>
              </button>
            </Link>
          </div>
        </>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand-details</title>
      </Helmet>
    </>
  );
}
