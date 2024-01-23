'use client';

import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Image from 'next/image';
import { Fragment } from 'react';
import classes from './Home.module.css';
import { Button, Carousel } from 'antd';
import Link from 'next/link';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function Home() {
  const images = [
    'https://cdn.chanhtuoi.com/uploads/2022/12/mau-background-noel-dep-mung-giang-sinh-2022-1670901526.jpg',
    'https://images.wallpaperscraft.com/image/single/christmas_tree_garland_street_68906_3450x2250.jpg',
    'https://w.wallhaven.cc/full/o5/wallhaven-o5762l.png',
    'https://cdn.pixabay.com/photo/2012/04/13/01/23/moon-31665_1280.png',
    'https://images.pexels.com/photos/980859/pexels-photo-980859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://treobangron.com.vn/wp-content/uploads/2022/11/background-noel-giang-sinh-4-2.jpg',
    'https://www.tnmt.edu.vn/wp-content/uploads/2023/11/hinh-nen-powerpoint-giang-sinh-2.jpg',
  ];

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <section className="relative">
        <video autoPlay muted loop className="w-full h-full">
          <source
            src="https://www.patagonia.com/media/marketing/videos/s24-cold-weather-layering-hero.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="absolute top-1/4 w-full text-center text-white">
          <p className="text-8xl">WINTER SALE</p>
          <p className="text-5xl">UP TO 70% OFF. Now until Jan. 29, 2024</p>
          <Link href="/products">
            <Button size={'large'} className={`mt-4 ${classes.shopBtn}`}>
              Shop now
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h5>Shop by Category</h5>

        <div>
          <Carousel
            prevArrow={<LeftOutlined></LeftOutlined>}
            nextArrow={<RightOutlined></RightOutlined>}
          >
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </div>
      </section>
    </Fragment>
  );

  {
    /* <Card className={`${classes.cardbar} mx-8 mt-8`}>
    <h3 className="text-center text-5xl mt-4 mb-4">Welcome to NextPee shop</h3>

    <Carousel slideInterval={2000}>
      {images.map((imageUrl, index) => {
        return (
          <div className={classes.image} key={index}>
            <Image fill src={imageUrl} alt={imageUrl} quality={100}></Image>
          </div>
        );
      })}
    </Carousel>
  </Card>; */
  }
}
