import { useDispatch, useSelector } from "react-redux";
import {
  getproducttowishlist,
  Removeproductfromwishlist,
} from "../../Redux/Productslice";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";

//import style from "./WishList.module.css";
export default function WishList() {
  let { AddProductToCart, setNumberofwishlist } = useContext(CartContext);

  async function AddToCart(productid) {
    let response = await AddProductToCart(productid);
    console.log(response);
  }

  let products = useSelector((state) => state?.productRed?.Wish);
  console.log(products.length + " products in wish list");

  let dispatch = useDispatch();
  async function Display() {
    await dispatch(getproducttowishlist());
    localStorage.setItem("medhat", products.length);
  }
  async function DELETE(id) {
    await dispatch(Removeproductfromwishlist(id));
    await dispatch(getproducttowishlist());
    localStorage.setItem("medhat", products.length);
  }

  useEffect(() => {
    Display();
  }, []);

  useEffect(() => {
    setNumberofwishlist(products.length);
  }, [Display]);

  return (
    <>
      {
        <div className="container mx-auto overflow-x-auto shadow-md sm:rounded-lg p-3 min-w-fit">
          {products?.length > 0 ? (
            <>
              <div>
                <h1 className="text-3xl font-bold  my-10">Wish List :</h1>
                {products?.map((product, index) => (
                  <div key={product?.id || index}>
                    <div className="flex md:justify-between sm:mx-10 md:mx-0 md:flex-row flex-col justify-center  ">
                      <div className="image w-full flex flex-col md:flex-row gap-5">
                        <Link
                          to={`/Productdetails/${product?.id}/${product?.category?.name}`}
                        >
                          <img
                            className="sm:w-fit  h-[200px] border-2 border-gray-200 md:mx-4 p-2"
                            src={product?.imageCover}
                            alt="image"
                          />
                        </Link>
                        <div className="text flex justify-center items-start flex-col gap-2 ">
                          <h2 className="text-2xl font-semibold">
                            {product?.category?.name}
                          </h2>

                          <h2
                            className={`{text-2xl font-semibold text-green-500} `}
                          >
                            {product?.price + " EGP"}
                          </h2>
                        </div>
                      </div>
                      <div className="BuTT  flex Md:justify-center md:items-center flex-col gap-2 my-3 md:my-0 md:mx-0 justify-start items-start ">
                        <button
                          onClick={() => AddToCart(product?.id)}
                          type="button"
                          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 min-w-40"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => DELETE(product?.id)}
                          type="button"
                          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 min-w-40"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl text-center text-black font-semibold ">
                  No products in your wish list
                </h1>
                <Link to={"/products"}>
                  <button
                    type="button"
                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-2xl font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2 "
                  >
                    Go to Products
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      }
       <Helmet>
        <meta charSet="utf-8" />
        <title>wishList</title>
      </Helmet>
    </>
  );
}
