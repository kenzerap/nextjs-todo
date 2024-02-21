'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import classes from './ProductCreateEditForm.module.css';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../../models/product.model';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProductCreateEditForm({
  isCreate,
  data,
}: {
  isCreate: boolean;
  data: Product | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<Product>>({
    name: '',
    price: 0,
    imageUrls: [],
    description: '',
  });

  const router = useRouter();
  const text = isCreate ? 'Create ' : 'Edit';

  useEffect(() => {
    if (data) {
      setInitialValues(data);
    }
  }, [data]);

  const productFormSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),

    price: Yup.number()
      .min(0, 'Proce is greater than 0')
      .required('This field is required'),

    imageUrls: Yup.array().of(Yup.string()),
    description: Yup.string(),
  });

  const submitForm = async (data: any) => {
    const url = isCreate ? '/api/product' : `/api/product/${data.id}`;
    const method = isCreate ? 'POST' : 'PUT';

    setIsLoading(true);
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    if (res.ok) {
      const message = isCreate ? 'Create successfully' : 'Update successfully';
      toast.success(message);
      router.replace('/products');
    } else {
      const resBody = await res.json();
      toast.error(resBody?.message || resBody);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productFormSchema}
      enableReinitialize={true}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid } = formik;
        return (
          <div className={classes.layout}>
            <div className="text-2xl font-bold mb-8	">{text} product</div>
            <Card>
              <Form>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Product name" />
                  </div>
                  <TextInput
                    id="name"
                    placeholder="Product name"
                    type="text"
                    color={errors.name && touched.name ? 'failure' : ''}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-red-700"
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price" value="Price" />
                  </div>
                  <TextInput
                    id="price"
                    type="number"
                    placeholder="Price"
                    color={errors.price && touched.price ? 'failure' : ''}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="text-red-700"
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="imageUrls" value="Image urls" />
                  </div>
                  <Textarea
                    id="imageUrls"
                    placeholder="imageUrl-1, imageUrl-2, ..."
                    value={formik.values.imageUrls}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                  </div>
                  <Textarea
                    id="description"
                    placeholder="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    type="submit"
                    className={
                      !isValid || isLoading ? 'disabled-btn mr-2' : 'mr-2'
                    }
                    disabled={!isValid || isLoading}
                  >
                    {isLoading ? <Spinner /> : text}
                  </Button>

                  <Link href={'/products'} className="ml-2">
                    <Button type="button">Cancel</Button>
                  </Link>
                </div>
              </Form>
            </Card>
          </div>
        );
      }}
    </Formik>
  );
}
