'use client';

import React, { useState } from 'react';
import classes from './ProductCard.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, Rate } from 'antd';
import { BestProduct } from '@/models/product.model';

const { Meta } = Card;

const ProductCard: React.FC<{
  product: BestProduct;
}> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const navigateToProducts = () => {
    router.push('/products');
  };

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={navigateToProducts}
      cover={
        <Image
          alt={
            !isHover ? props.product.imageShowUrl : props.product.imageHoverUrl
          }
          src={
            !isHover ? props.product.imageShowUrl : props.product.imageHoverUrl
          }
          width={300}
          height={400}
        />
      }
    >
      <h5 className="text-base font-bold truncate" title={props.product.name}>
        {props.product.name}
      </h5>
      <p
        className="font-normal text-gray-400 truncate"
        title={props.product.description}
      >
        {props.product.description}
      </p>
      <div className="mt-4 flex">
        <Rate
          disabled
          defaultValue={0}
          allowHalf
          value={props.product.rate.averageValue}
        />
        <p className="ml-2">({props.product.rate.rateCount})</p>
      </div>
      <div className="mt-4 font-bold text-red-700">${props.product.price}</div>
    </Card>
  );
};

export default ProductCard;
