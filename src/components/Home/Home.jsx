import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import Featureproduct from "../Featureproduct/Featureproduct";
import MainSlider from "../MainSlider/MainSlider";
export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Featureproduct />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
    </>
  );
}
