import grocery1 from "../../assets/grocery-banner.png";
import grocery2 from "../../assets/grocery-banner-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img1 from "../../assets/slider-image-1.jpeg";
import sli2 from "../../assets/slider-2.jpeg";

import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="container mx-auto p-0 my-8">
        <h1 className="text-3xl mb-4">Popular anime :</h1>
        <div className="flex">
          <div className="w-3/4">
            <Slider {...settings}>
              <img className="w-[500px] h-[300px]" src={img3} alt="image" />
              <img className="w-[500px] h-[300px]" src={img2} alt="image" />
              <img className="w-[500px] h-[300px]" src={img1} alt="image" />
              <img className="w-[500px] h-[300px]" src={sli2} alt="image" />
            </Slider>
          </div>
          <div className="w-1/4 flex flex-col ">
            <img className="w-[500px] h-[150px]" src={grocery1} alt="image" />
            <img className="w-[500px] h-[150px]" src={grocery2} alt="image" />
          </div>
        </div>
      </div>
    </>
  );
}
