import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();
export default function TokenContextprovider(props) {
  const [Token, setToken] = useState(null);
  useEffect(() => {
    localStorage.getItem("userToken")?
     setToken(localStorage.getItem("userToken"))
      : setToken(null);
  }, []);

  return (
    <TokenContext.Provider value={{ Token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
