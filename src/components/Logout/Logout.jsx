import React, { useEffect, useState } from "react";
//import style from "./Logout.module.css";
export default function Logout() {
  const [Counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h1 className="bg-red-500 text-center text-white text-2xl">
        Logout{" "}
      </h1>
    </>
  );
}
