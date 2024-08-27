import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../TokenContext/Tokencontext";
import { CartContext } from "../CartContext/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { getproducttowishlist } from "../../Redux/Productslice";
import carty from "../../../public/cart.webp";
export default function Navbar() {
  let { NumberofCartitem, getcardproducts, setNumberofwishlist } =
    useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();
  let { Token, setToken } = useContext(TokenContext);
  let dispatch = useDispatch();
  const [SS, setSS] = useState(0);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function handlelogout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  function getcard() {
    getcardproducts();
  }

  let products = useSelector((state) => state?.productRed?.Wish);

  async function Display() {
    await dispatch(getproducttowishlist());
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      await Display();
      setNumberofwishlist(products.length);
      localStorage.setItem("medhat", products.length);
      setSS(localStorage.getItem("medhat"));
      setNumberofwishlist(SS);
    };
    fetchWishlist();
  }, [products.length]);

  useEffect(() => {
    getcard();
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={carty}
              className="w-[60px] rounded-[40px] mb-1"
              alt=" Logo"
            />
            <span className="self-center text-2xl text-green-400 font-semibold whitespace-nowrap ">
              Zekola
            </span>
          </NavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div>
              <ul className="flex justify-center  items-center flex-col md:flex-row">
                {Token ? (
                  <li
                    onClick={() => handlelogout()}
                    className="md:ps-4 hover:text-green-600 text-black text-xl font-semibold "
                  >
                    <a href={"#"}>Logout</a>
                  </li>
                ) : (
                  <>
                    <li className="hover:text-green-600 text-black text-xl font-semibold">
                      <NavLink to={"/login"}>Login</NavLink>
                    </li>
                    <li className="md:px-3 hover:text-green-600 text-black text-xl font-semibold">
                      <NavLink to={"/register"}>Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {Token ? (
            <div
              className={`items-center justify-between ${
                isMenuOpen ? "block" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 dark:border-gray-600">
                <li>
                  <NavLink
                    to={"/"}
                    className="block py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"cart"}
                    className="block relative py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    Cart
                    <span className="absolute top-0 left-[3.5rem]">
                      {NumberofCartitem ? (
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {NumberofCartitem}
                        </div>
                      ) : null}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className="block py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Categoris"}
                    className="block py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    Categoris
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"wishlist"}
                    className="block relative py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    WishList
                    {SS > 0 ? (
                      <span className="absolute top-0 left-[5.6rem]">
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {SS}
                        </div>
                      </span>
                    ) : null}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"brands"}
                    className="block py-2 px-3 text-xl font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-600"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
