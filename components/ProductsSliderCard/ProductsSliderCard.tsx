'use client';

import React, { useState } from 'react';
import classes from './ProductsSliderCard.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from 'antd';

const ProductsSliderCard: React.FC<{
  imageShowUrl: string;
  imageHoverUrl: string;
}> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const navigateToProducts = () => {
    router.push('/products');
  };

  return (
    <Card
      className={classes.cardItem}
      onClick={navigateToProducts}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
        <Image
          src={!isHover ? props.imageShowUrl : props.imageHoverUrl}
          alt={!isHover ? props.imageShowUrl : props.imageHoverUrl}
          fill
        ></Image>
    </Card>
  );
};

export default ProductsSliderCard;
