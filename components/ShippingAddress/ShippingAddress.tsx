'use client';

import React, { useState } from 'react';
import classes from './ShippingAddress.module.css';
import { Card, Label, TextInput } from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ShippingAddress: React.FC<{}> = (props) => {
  const [initialValues] = useState<{
    name: string;
    phone: string;
    address: string;
  }>({
    name: '',
    phone: '',
    address: '',
  });

  const signupFormSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    phone: Yup.number()
      .min(0, 'Invalid phone number')
      .required('This field is required'),
    address: Yup.string().required('This field is required'),
  });

  return (
    <Card className="overflow-x-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Shipping address
      </h5>

      <Formik
        initialValues={initialValues}
        validationSchema={signupFormSchema}
        onSubmit={() => {}}
      >
        {(formik) => {
          const { errors, touched, isValid } = formik;
          return (
            <Form>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Full name"
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

              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone" />
                </div>
                <TextInput
                  id="phone"
                  type="number"
                  placeholder="Phone"
                  color={errors.phone && touched.phone ? 'failure' : ''}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className="text-red-700"
                />
              </div>

              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  placeholder="Address"
                  color={errors.address && touched.address ? 'failure' : ''}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  name="address"
                  component="span"
                  className="text-red-700"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default ShippingAddress;
