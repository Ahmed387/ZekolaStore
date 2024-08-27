import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useDispatch, useSelector } from "react-redux";
import {
  Addproducttowishlist,
  getproducttowishlist,
  Removeproductfromwishlist,
} from "../../Redux/Productslice";

//import style from "./Featueproduct.module.css";
export default function Featureproduct() {
  let dispatch = useDispatch();
  let { AddProductToCart, setNumberofwishlist, Numberofwishlist } =
    useContext(CartContext);
  const [idbag, setidbag] = useState({});
  const [S, setS] = useState("");
  const [Filter, setFilter] = useState([]);

  function getfeatureproduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  async function AddToCart(productid) {
    let response = await AddProductToCart(productid);
    console.log(response);
  }

  let { data, isError, error } = useQuery({
    queryKey: ["Featureproduct"],
    queryFn: getfeatureproduct,
    staleTime: 5000,
  });

  let All = data?.data?.data || [];
  console.log(All);
  // item.title.toLowerCase().includes(e.target.value.toLowerCase()
  function Search(e) {
    setS(e.target.value);
    let filtered = All.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filtered);
    setFilter(filtered);
  }

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
  let Addpro = useSelector((state) => state?.productRed);

  let products = useSelector((state) => state?.productRed?.Wish);
  console.log(products.length + " products in wish list");
  console.log(Addpro);

  useEffect(() => {
    const wishlistIds = Addpro.Wish.map((item) => item.id);
    const newIdBag = wishlistIds.reduce((acc, id) => {
      acc[id] = true;

      return acc;
    }, {});

    setidbag(newIdBag);
  }, []);

  async function toggle(id) {
    let itemClicked = idbag[id];
    setidbag((idbag) => ({ ...idbag, [id]: !idbag[id] }));
    try {
      if (!itemClicked) {
        await dispatch(Addproducttowishlist(id));
        await dispatch(getproducttowishlist());
      } else {
        await dispatch(Removeproductfromwishlist(id));
        await dispatch(getproducttowishlist());
      }
      console.log(idbag);
    } catch (error) {
      console.error("Error while updating wishlist", error);
    }
  }

  async function Display() {
    await dispatch(getproducttowishlist());
  }
  useEffect(() => {
    setNumberofwishlist(products.length);
    console.log(products.length);
    console.log(Numberofwishlist);

    localStorage.setItem("medhat", products.length);
  }, [Display]);

  useEffect(() => {
    const storedMedhat = localStorage.getItem("medhat");
    if (storedMedhat) {
      console.log("Stored medhat:", storedMedhat);
    }
  }, []);
  return (
    <>
      {isError ? (
        <h1 className="text-4xl text-green-700">the Error is : {error}</h1>
      ) : null}
      <div className="container mx-auto mt-8 ">
        <form className="w-3/4 mx-auto mt-14 mb-12">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => Search(e)}
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
            />
          </div>
        </form>

        {S == "" ? (
          <div className="flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
            {All.map((product) => (
              <div
                key={product.id}
                className=" transition-all duration-200 mb-7 hover:md:mx-3  hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/6 bg-white border border-gray-400 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
              >
                <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                  <Link
                    to={`/Productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="rounded-t-lg pt-1 h-[13rem] "
                      loading="lazy"
                      src={product.imageCover}
                      alt="product image"
                    />
                  </Link>
                </div>

                <div className=" pb-5 text-center">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-2">
                    {product.category.name}
                  </h5>

                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h5>
                  <div className="flex items-center justify-center gap-x-2 mt-2.5 mb-3">
                    <div className="flex items-center">
                      {showstars(product.ratingsAverage)}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white ps-2">
                      {"$" + product.price}
                    </span>
                    <button
                      onClick={() => AddToCart(product.id)}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 me-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="icon mt-6 ">
                    <i
                      className={`fa-solid fa-heart fa-2xl  ${
                        idbag[product.id] ? "text-red-600" : "text-black"
                      }`}
                      onClick={() => toggle(product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
            {Filter.map((product) => (
              <div
                key={product.id}
                className=" transition-all duration-200 mb-7 hover:md:mx-3  hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/6 bg-white border border-gray-400 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
              >
                <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                  <Link
                    to={`/Productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="rounded-t-lg pt-1 h-[13rem] "
                      loading="lazy"
                      src={product.imageCover}
                      alt="product image"
                    />
                  </Link>
                </div>

                <div className=" pb-5 text-center">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-2">
                    {product.category.name}
                  </h5>

                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h5>
                  <div className="flex items-center justify-center gap-x-2 mt-2.5 mb-3">
                    <div className="flex items-center">
                      {showstars(product.ratingsAverage)}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white ps-2">
                      {"$" + product.price}
                    </span>
                    <button
                      onClick={() => AddToCart(product.id)}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 me-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="icon mt-6 ">
                    <i
                      className={`fa-solid fa-heart fa-2xl  ${
                        idbag[product.id] ? "text-red-600" : "text-black"
                      }`}
                      onClick={() => toggle(product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
