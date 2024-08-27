import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
  };
  function getcategoryslider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getcategoryslider,
  });
  //console.log(data?.data?.data);
  let All = data?.data?.data || [];
  //console.log(All);

  return (
    <>
      <div className="container mx-auto p-0 my-8">
        <h2 className="text-2xl my-6">show popular Categories :</h2>
        <Slider {...settings}>
          {All?.map((src) => (
            <div key={src?._id} className="text-center p-0 m-0">
              <img
                key={src?._id}
                className="w-full h-[200px]"
                src={src.image}
                alt="imageDetail"
              />
              <h3 className="text-xl">{src.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
