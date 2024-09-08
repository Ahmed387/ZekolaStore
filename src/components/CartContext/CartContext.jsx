import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export let CartContext = createContext();
export default function CartContextprovider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [NumberofCartitem, setNumberofCartitem] = useState(0);
  const [Totalprice, setTotalprice] = useState(0);
  const [Cartid, setCartid] = useState(null);
  const [Numberofwishlist, setNumberofwishlist] = useState(0);
  const [products, setproducts] = useState([]);

  async function AddProductToCart(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setCartid(response.data.data._id);
        setTotalprice(response.data.data.totalCartPrice);
        setNumberofCartitem(response.data.numOfCartItems);
        toast.success(response.data.message);

        return response;
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.data.message);

        return error;
      });
  }

  async function getcardproducts() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setNumberofCartitem(response.data.numOfCartItems);
        setCartid(response.data.data._id);
        setTotalprice(response.data.data.totalCartPrice);
        console.log(response);
        return response;
      })
      .catch((error) => error);
  }

  async function Deleteitems(productid) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`, {
        headers,
      })
      .then((response) => {
        setNumberofCartitem(response.data.numOfCartItems);
        setTotalprice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((error) => error);
  }

  async function Updatecartitem(productid, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        { count },
        {
          headers,
        }
      )
      .then((response) => {
        setNumberofCartitem(response.data.numOfCartItems);
        setTotalprice(response.data.data.totalCartPrice);
        setCartid(response.data.data._id);
        return response;
      })
      .catch((error) => error);
  }
  async function Payment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Cartid}?url=https://zekola-store.vercel.app/Allorders`,
        { shippingAddress },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response?.data?.session?.url);
        let paymentUrl = response?.data?.session?.url;
        if (paymentUrl) {
          window.open(paymentUrl, "_self");
        }
        return response;
      })
      .catch((error) => error);
  }

  async function CashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${Cartid}`,
        { shippingAddress },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response?.data?.status);
        if (response?.data?.status == "success") {
          window.location.href = "/";
        }
        return response;
      })
      .catch((error) => error);
  }

  async function ClearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setTotalprice(0);
        setNumberofCartitem(response.data.numOfCartItems);
        setTotalprice(response.data.data.totalCartPrice);
        console.log(response);
        return response;
      })
      .catch((error) => error);
  }
  return (
    <CartContext.Provider
      value={{
        Updatecartitem,
        ClearCart,
        AddProductToCart,
        Deleteitems,
        getcardproducts,
        NumberofCartitem,
        Totalprice,
        setTotalprice,
        Payment,
        CashPayment,
        setNumberofwishlist,
        Numberofwishlist,
        setproducts,
        products,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
