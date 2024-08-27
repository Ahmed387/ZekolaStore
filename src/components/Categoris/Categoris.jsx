import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcat } from "../../Redux/Productslice";
import { Helmet } from "react-helmet";

export default function Categoris() {
  let dispatch = useDispatch();
  let categories = useSelector((state) => state.productRed.categories);
  console.log(categories?.data);

  async function getdata() {
    await dispatch(getcat());
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 ">
        <div className="flex flex-wrap justify-center items-center sm:gap-x-2 sm:gap-y-2 md:gap-x-4 md:gap-y-2 lg:gap-x-2 lg:gap-y-4 text-center mx-auto ">
          {categories?.data?.map((product) => (
            <div
              key={product._id}
              className="transition-all duration-200 mb-7 hover:md:mx-3 hover:lg:mx-6 hover:scale-110 ease-linear  w-full px-3  sm:w-1/2 md:w-1/4 lg:w-1/6 bg-white border border-gray-300 hover:border-2 hover:border-green-300 rounded-lg shadow text-center mx-auto overflow-hidden"
            >
              <div className=" flex justify-center items-center  w-[200px]  pt-3 text-center mx-auto">
                <img
                  className=" pt-1 h-[13rem] pe-4"
                  loading="lazy"
                  src={product.image}
                  alt="product image"
                />
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
        <title>categories</title>
      </Helmet>
    </>
  );
}
