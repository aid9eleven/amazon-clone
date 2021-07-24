import React, { useState } from 'react'
import './Slider.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

function Slider() {
  const [index, setIndex] = useState(0)

  const slideImages = [
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg",
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg"
  ]

  return (
    <div className="slider">
      <div 
        className="slider__slides"
        style={
          {
            marginLeft: (-index*100) + "%"
          }
        }
      >
        {slideImages.map((slide, index) => (
          <img 
            key={index}
            src={slide}
            alt=""
          />
        ))}
      </div>
      <div className="slider__fade" />
      <div 
        className="slider__arrowLeft"
        onClick={() => setIndex(index>0?index-1:slideImages.length-1)}  
      >
        <KeyboardArrowLeftIcon />
      </div>
      <div 
        className="slider__arrowRight"
        onClick={() => setIndex(index<(slideImages.length-1)?index+1:0)}  
      >
        <KeyboardArrowRightIcon />
      </div>
    </div>
  )
}

export default Slider
