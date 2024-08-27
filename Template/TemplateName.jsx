import React, { useEffect, useState } from "react";
import style from "./TemplateName.module.css";
export default function TemplateName() {
  const [Counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h1 className="bg-red-500 text-center text-white text-2xl">
        TemplateName{" "}
      </h1>
    </>
  );
}
