'use client';

import React, {
  ChangeEvent,
  Fragment,
  Suspense,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Card,
  Carousel,
  CustomFlowbiteTheme,
  Label,
  Spinner,
  Table,
  TextInput,
  Textarea,
} from 'flowbite-react';
import classes from './ProductViewDetail.module.css';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../../models/product.model';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { Rate } from 'antd';
import Slider from 'react-slick';
import SliderArrow from '../SliderArrow/SliderArrow';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartShoppingSlice';

export default function ProductViewDetail({ data }: { data: Product }) {
  console.log('ProductViewDetail: ', data);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const customTheme: CustomFlowbiteTheme['carousel'] = {
    indicators: {
      active: {
        off: 'bg-gray-500/50 hover:bg-gray-500 dark:bg-gray-800/50 dark:hover:bg-gray-800',
        on: 'bg-gray-500 dark:bg-gray-800',
      },
    },
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/30 group-hover:bg-gray-500/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-500/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
      icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
    },
  };

  const addCartProductHandler = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          item: data,
          quantity,
        })
      );
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Product detail</div>
      </div>

      <Card>
        <Suspense
          fallback={
            <div className="text-center">
              <Spinner />
            </div>
          }
        >
          <div className={classes.detailBody}>
            <div className={classes.imageArea}>
              <Carousel theme={customTheme} slide={false}>
                {(data.imageUrls || []).map((imageUrl, index) => {
                  return (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      key={index}
                    >
                      <Image src={imageUrl} alt={imageUrl} quality={100} fill />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className={classes.detailArea}>
              <div className="text-3xl font-bold mb-4">{data.name}</div>
              <div className="text-2xl font-bold text-red-700 mb-4">
                ${data.price}
              </div>
              <div className="flex mb-4">
                <Rate
                  disabled
                  defaultValue={0}
                  allowHalf
                  value={
                    data.rate?.averageValue || Math.floor(Math.random() * 5) + 1
                  }
                />
                <p className="ml-2">
                  (
                  {data.rate?.rateCount || Math.floor(Math.random() * 9999) + 1}{' '}
                  Ratings)
                </p>
              </div>
              <div className="mb-4">{data.description}</div>
              <div className="flex mb-4">
                <div className="mr-2 font-bold">Categories:</div>
                <div>{data.category?.name}</div>
              </div>
              <div className="flex">
                <TextInput
                  className="w-16 mr-2"
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />

                <Button
                  color="failure"
                  onClick={() => addCartProductHandler()}
                  className="w-max"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </Suspense>
      </Card>
    </Fragment>
  );
}
