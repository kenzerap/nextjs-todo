'use client';

import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Image from 'next/image';
import { Fragment } from 'react';
import classes from './Home.module.css';
import { Button, Carousel } from 'antd';
import Link from 'next/link';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderArrow from '@/components/SliderArrow/SliderArrow';
import { categories } from '@/utils/categories.const';
import ProductsSliderCard from '@/components/ProductsSliderCard/ProductsSliderCard';
import { bestSellerProducts } from '@/utils/bestSellerProducts.const';
import FooterBar from '@/components/FooterBar/FooterBar';

export default function Home() {
  const categoriesData = categories;
  const bestSellerProductsData = bestSellerProducts;

  const categorysliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SliderArrow isLeftArrow={false} />,
    prevArrow: <SliderArrow isLeftArrow={true} />,
  };

  const bestSellerSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SliderArrow isLeftArrow={false} />,
    prevArrow: <SliderArrow isLeftArrow={true} />,
  };

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <section className="relative mx-8 mt-8">
        <video autoPlay muted loop className="w-full h-full">
          <source
            src="https://www.patagonia.com/media/marketing/videos/s24-cold-weather-layering-hero.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="absolute top-1/4 w-full text-center text-white">
          <p className={`${classes['fontSize-5vw']}`}>WINTER SALE</p>
          <p className={`${classes['fontSize-2-5vw']}`}>
            UP TO 70% OFF. Now until Jan. 29, 2024
          </p>
          <Link href="/products">
            <Button size={'large'} className={`mt-4 ${classes.shopBtn}`}>
              Shop now
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-8 mx-8">
        <h5 className="text-2xl font-bold mb-4">Categories</h5>

        <Slider {...categorysliderSettings}>
          {categoriesData.map((category, index) => {
            return (
              <div key={index}>
                <CategoryCard
                  coverImg={category.coverImg}
                  textBody={category.name}
                ></CategoryCard>
              </div>
            );
          })}
        </Slider>
      </section>

      <section className="m-8">
        <div className="flex justify-between mb-4">
          <h5 className="text-2xl font-bold">Best Sellers</h5>

          <Link className="text-2xl underline" href={'/products'}>
            See all
          </Link>
        </div>
        <Slider {...bestSellerSliderSettings}>
          {bestSellerProductsData.map((product, index) => {
            return (
              <div key={index}>
                <ProductsSliderCard
                  imageShowUrl={product.imageShowUrl}
                  imageHoverUrl={product.imageHoverUrl}
                ></ProductsSliderCard>
              </div>
            );
          })}
        </Slider>
      </section>

      <FooterBar></FooterBar>
    </Fragment>
  );
}
