import React from "react";
import "../css/main.css";
import { useState, useEffect, useCallback  } from "react";
import {Link} from 'react-router-dom';
import makeupImg from "../Images/makeup.jpg";
import skincareImg from "../Images/skincare.jpg";
import haircareImg from "../Images/haircare.jpg";
import frangranceImg from "../Images/frangrance.jpg";
import personalImg from "../Images/personal.jpg";
import accessoriesImg from "../Images/accessories.jpg";
import slider1Img from "../Images/slider1.jfif";
import slider2Img from "../Images/slider2.jfif";
import slider3Img from "../Images/slider3.jpg";

export default function Main() {
  const SliderImages = [slider1Img, slider2Img, slider3Img];

  document.title = "Fashion Aura";

  // State to manage the current index of the displayed image
  const [index, setIndex] = useState(0);

  // Function to go to the next image
  const imageSliderNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % SliderImages.length);
  }, [SliderImages.length]);

  // Memoize the function to go to the previous image
  const imageSliderPrev = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + SliderImages.length) % SliderImages.length);
  }, [SliderImages.length]);

  // Slideshow functionality (auto-slide every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      imageSliderNext();
    }, 3000); // 3-second interval
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [imageSliderNext]);

  return (
    <main>
      <div className="slider">
        <button id="prev" onClick={imageSliderPrev}>
          &lsaquo;
        </button>
        <button id="next" onClick={imageSliderNext}>
          &rsaquo;
        </button>
        {/* Display the current image */}
        <img
          src={SliderImages[index]}
          alt="Slider"
          width="100%"
          height="100%"
        />
      </div>
      <div className="container">
        <div className="card">
          <h1 className="my2">CATEGORIES</h1>
          <div className="cards row">
            <Link to="/makeup" className="card-item px-0 col-lg-3 col-5">
              <img src={makeupImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">MakeUp</h4>
              </div>
            </Link>
            <Link to="/skincare" className="card-item px-0 col-lg-3 col-5">
              <img src={skincareImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">Skin Care</h4>
              </div>
            </Link>
            <Link to="/haircare" className="card-item px-0 col-lg-3 col-5">
              <img src={haircareImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">Hair Care</h4>
              </div>
            </Link>
            <Link to="/fragrance" className="card-item px-0 col-lg-3 col-5">
              <img src={frangranceImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">Fragrances</h4>
              </div>
            </Link>
            <Link to="/personal" className="card-item px-0 col-lg-3 col-5">
              <img src={personalImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">Personal Care</h4>
              </div>
            </Link>
            <Link to="/accessories" className="card-item px-0 col-lg-3 col-5">
              <img src={accessoriesImg} width="100%" height="220px" alt="img"/>
              <div className="lines">
                <h4 className="text-center my1">Accessories</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
