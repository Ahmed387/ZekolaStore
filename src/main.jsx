import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import Countercontextprovider from "./Countercontext/Countercontext.jsx";
import TokenContextprovider from "./TokenContext/Tokencontext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextprovider from "./components/CartContext/CartContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CartContextprovider>
      <TokenContextprovider>
        <Countercontextprovider>
          <App />
        </Countercontextprovider>
      </TokenContextprovider>
    </CartContextprovider>
  </Provider>
  
)
