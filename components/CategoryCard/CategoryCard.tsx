'use client';

import React from 'react';
import classes from './CategoryCard.module.scss';
import { useRouter } from 'next/navigation';
import { Card } from 'flowbite-react';

const CategoryCard: React.FC<{
  coverImg: string;
  textBody: string;
}> = (props) => {
  const router = useRouter();

  const navigateToProducts = () => {
    router.push('/products');
  };

  return (
    <Card
      className={classes.cardItem}
      style={{
        backgroundImage: `url(${props.coverImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
      onClick={navigateToProducts}
    >
      <div className={classes.textBody}>{props.textBody}</div>
    </Card>
  );
};

export default CategoryCard;
