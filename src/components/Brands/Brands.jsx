import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Brands() {
  //{{BaseUrl}}/api/v1/brands
  //https://ecommerce.routemisr.com

  const [products, setproducts] = useState([]);

  function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((data) => {
        console.log(data);
        setproducts(data?.data?.data);
        return data;
      })
      .catch((error) => console.log(error));
  }

  let { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  return (
    <>
      <div className="container mx-auto mt-14">
        <div className="flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
          {products.map((product) => (
            <div
              key={product._id}
              className="transition-all  duration-200 mb-7 hover:md:mx-3 hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/6 bg-white border border-gray-300 hover:border-2 hover:border-green-300 rounded-lg text-center mx-auto overflow-hidden hover:shadow-lg"
            >
              <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                <Link to={`/Branddetails/${product._id}`}>
                  <img
                    className="rounded-t-lg pt-1 h-[13rem] lg:px-8 md:px-6"
                    loading="lazy"
                    src={product.image}
                    alt="product image"
                  />
                </Link>
              </div>

              <div className=" pb-5 text-center">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-2">
                  {product.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
    </>
  );
}
