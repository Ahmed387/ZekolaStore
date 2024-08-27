import { Helmet } from "react-helmet";
import Featureproduct from "../Featureproduct/Featureproduct";
export default function Products() {
  return (
    <>
      <Featureproduct />
      <Helmet>
        <meta charSet="utf-8" />
        <title>products</title>
      </Helmet>
    </>
  );
}
