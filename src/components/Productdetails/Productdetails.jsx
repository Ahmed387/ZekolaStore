import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
//import style from "./Productdetails.module.css";
//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

export default function Productdetails() {
  const [ProDetails, setProDetails] = useState(null);
  const [ProRelated, setProRelated] = useState(null);
  let { AddProductToCart } = useContext(CartContext);
  async function AddToCart(productid) {
    let response = await AddProductToCart(productid);
    console.log(response);
  }

  const [isLoading, setisLoading] = useState(false);
  let { id, category } = useParams();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
  };
  async function getproductdetails() {
    setisLoading(true);
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProDetails(data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }
  async function getRelatedproduct() {
    setisLoading(true);
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        setisLoading(false);
        let Related = data?.data?.data;
        Related = Related.filter((el) => el.category.name == category);
        setProRelated(Related);
        console.log(ProRelated);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }
  let All = ProDetails?.data?.data || [];

  function Up() {
    window.scrollTo({
      top: 0,
      behavio: "smooth",
    });
  }

  useEffect(() => {
    getproductdetails();
    getRelatedproduct();
  }, [id, category]);
  // console.log(All);
  //console.log(`Related ${ProRelated}`);

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
      <div className="container mx-auto mt-4">
        <div className="flex flex-wrap justify-center sm:flex-row flex-col sm:items-center">
          {isLoading ? <Loader /> : null}
          <div className="w-1/3 flex justify-center flex-col ">
            <Slider {...settings}>
              {All?.images?.map((src) => (
                <img
                  key={All?.id}
                  className="w-fit border-4 border-gray-200 p-5 shadow-lg"
                  src={src}
                  loading="lazy"
                  alt="imageDetail"
                  fetchPriority="high"
                />
              ))}
            </Slider>
          </div>

          <div className="flex flex-col justify-start p-4 leading-normal w-2/3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {All?.category?.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {All?.description}
            </p>
            <h5 className="text-green-600 text-xl">
              {All?.title?.split(" ").splice(0, 2).join(" ")}
            </h5>
            <div className="flex justify-between mt-10">
              <h5 className="text-2xl font-semibold "> {` $ ${All.price}`}</h5>
              <div className="flex items-center justify-center mt-2.5 mb-3">
                <div className="flex items-center">
                  {showstars(All.ratingsAverage)}
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                  {All.ratingsAverage}
                </span>
              </div>
            </div>
            <div className="mt-6 mx-auto">
              <button
                onClick={() => AddToCart(All.id)}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 me-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-4xl my-10">Related Product: </h1>
        <div className="container mx-auto mt-4">
          <div className=" flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
            {ProRelated?.map((product) => (
              <div
                key={product.id}
                //hereeeeeeee

                className=" transition-all duration-200 mb-7 hover:md:mx-3 hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/6 bg-white border border-gray-300 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
              >
                <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                  <Link
                    to={`/Productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      onClick={() => Up()}
                      className="rounded-t-lg pt-1 h-[13rem] "
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

                  <div className="flex items-center justify-center mt-2.5 mb-3">
                    <div className="flex items-center">
                      {showstars(product.ratingsAverage)}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products-Details</title>
      </Helmet>
    </>
  );
}
