import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../Components/Card'
import CountrySelect from '../Components/CountrySelect'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Section from '../Components/Section'
import Sidebar from '../Components/Sidebar'
import Slider from '../Components/Slider'
import Subheader from '../Components/Subheader'
import { useStateValue } from '../StateProvider'
import products from '../products.json'
import './Homescreen.css'

function Homescreen() {
  const [{user, topSellers}, dispatch] = useStateValue()
  const history = useHistory()

  const handleSignin = () => {
    history.push("/signin")
  }

  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        history.push("/validateuser")
      }
    }
  }, [user])

  return (
    <div className="homescreen">
      <CountrySelect />
      <Sidebar />
      <Header />
      <Subheader />
      <Slider />

      <div className="homescreen__body">
        <div className="homescreen__categories">
          <Card 
            title="Find your ideal TV"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_TV_2X._SY304_CB432517900_.jpg"
            destination="/categories/17"
            link="See more"
          />
          <Card 
            title="Beauty picks"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
            destination="/categories/4"
            link="See more"
          />
          <Card 
            title="Video games"
            img="https://assets.weforum.org/article/image/5wlXbzjwAITqYYyaeCDcvR5S1QN39afvkA3soHBBv04.jpg"
            destination="/categories/24"
            link="See more"
          />
          {
            user?
              <Card 
                title="Deals & Promotions"
                img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Deals_1x._SY304_CB430401028_.jpg"
                destination="/"
                link="See more"
              />
            :
              <div className="homescreen__feature">
                <div className="homescreen__loginCard">
                  <h2>Sign in for the best experience</h2>
                  <button onClick={handleSignin}>Sign in securely</button>
                </div>
                <div className="homescreen__ad">
                  <img 
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg"
                    alt=""
                  />
                </div>
              </div>
          }
          <Card 
            title="Shop top categories"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_Dash_PD_Nonprime__1x._SY304_CB403084762_.jpg"
            destination="/categories/top"
            link="See more"
          />
          <Card 
            title="AmazonBasics"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            destination="/"
            link="See more"
          />
          <Card 
            title="Be active and fit"
            img="https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg"
            destination="/categories/21"
            link="Explore now"
          />
          <Card 
            title="Computers and Accessories"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
            destination="/categories/6"
            link="See more"
          />
        </div>

        <Section
          title="Top Beauty &#38; Personal Care products"
          destination="/categories/4"
          link="Shop now"
          items={products.filter(product => product.category===4).slice(0, 10)}
        />
        <Section
          title="Amazon Top Sellers"
          destination="/categories/top"
          link="Shop now"
          items={topSellers.slice(0, 15)}
        />

        <div className="homescreen__categories">
          <Card 
            title="Comfy styles for her"
            img="https://www.stitchfix.com/women/blog/wp-content/uploads/blogger-summer-dresses-HF-936x468.jpg"
            destination="/categories/9"
            link="See more"
          />
          <Card 
            title="Shop Laptops &#38; Tablets"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
            destination="/categories/6"
            link="See more"
          />
          <Card 
            title="Explore home bedding"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg"
            destination="/categories/14"
            link="See more"
          />
          <Card 
            title="Create with strip lights"
            img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_StripLighting_379x304_1X_en_US._SY304_CB418597476_.jpg"
            destination="/categories/8"
            link="See more"
          />
        </div>

        <Section
          title="Must have Wireless products"
          destination="/categories/8"
          link="Shop now"
          items={products.filter(product => product.category===8).slice(0, 10)}
        />
        <Section
          title="Gifts in Video Games"
          destination="/categories/24"
          link="Shop now"
          items={products.filter(product => product.category===24).slice(0, 10)}
        />
        <Section
          title="Stuffed Animals &#38; Toys"
          destination="/categories/23"
          link="Shop now"
          items={products.filter(product => product.category===23).slice(0, 10)}
        />
        <Section
          title="Best Sellers in Baby"
          destination="/categories/3"
          link="Shop now"
          items={products.filter(product => product.category===3).slice(0, 10)}
        />
        <Section
          title="Home Décor"
          destination="/categories/14"
          link="Shop now"
          items={products.filter(product => product.category===14).slice(0, 10)}
        />
      </div>

      <Footer />
    </div>
  )
}

export default Homescreen
