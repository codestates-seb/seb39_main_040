import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FirstImage from "../../assets/Carousel1.jpg";
import SecondImage from "../../assets/Carousel2.jpg";
import ThirdImage from "../../assets/Carousel3.jpg";

const images = [
  {
    photo: FirstImage,
    label: "image1",
  },
  {
    photo: SecondImage,
    label: "image2",
  },
  {
    photo: ThirdImage,
    label: "image3",
  },
];

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: true,
    slickPrevious: true,
  };
  return (
    <Slider {...settings}>
      {images.map((step) => (
        <div key={step.label}>
          <img
            src={step.photo}
            alt={step.label}
            style={{
              height: "750px",
              display: "block",
              overflow: "hidden",
              width: "100%",
            }}
          />
        </div>
      ))}
    </Slider>
  );
}
