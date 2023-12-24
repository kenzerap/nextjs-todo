import HeaderBar from '@/components/HeaderBar/HeaderBar';
import { Card, Carousel } from 'flowbite-react';
import Image from 'next/image';
import { Fragment } from 'react';
import classes from './Home.module.css';

export default function Home() {
  const images = [
    'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
  ];

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <Card className={classes.cardbar}>
        <h3 className="text-center text-7xl mt-8 mb-8">
          Welcome to ReactPee shop
        </h3>

        <Carousel slideInterval={2000}>
          {images.map((imageUrl, index) => {
            return (
              <div className={classes.image} key={index}>
                <Image fill src={imageUrl} alt={imageUrl} quality={100}></Image>
              </div>
            );
          })}
        </Carousel>
      </Card>
    </Fragment>
  );
}
