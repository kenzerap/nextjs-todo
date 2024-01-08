'use client';

import React, { Fragment, useState } from 'react';
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import classes from './UserDetailEditForm.module.css';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User } from '@/models/user.model';

export default function UserDetailEditForm({
  userDetail,
}: {
  userDetail: User;
}) {
  const router = useRouter();
  const [initialValues] = useState<{
    email: string;
    name: string;
    phone: number;
    address: string;
  }>({ ...userDetail });

  const [loading, setLoading] = useState(false);

  const editFormSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required'),

    name: Yup.string().required('This field is required'),
    phone: Yup.number().min(0, 'Invalid phone number'),
    address: Yup.string(),
  });

  const submitForm = async (data: any) => {
    console.log('data: ', data);

    const url = `/api/users/${userDetail.id}`;
    const method = 'PUT';
    const bodyData = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
    };

    setLoading(true);
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(bodyData),
    });

    setLoading(false);

    const resBody = await res.json();

    if (res.ok) {
      toast.success('Update successfully');
      router.replace(`/users/${userDetail.id}`);
    } else {
      toast.error(resBody.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editFormSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid } = formik;
        return (
          <Fragment>
            <div className="m-8 grid justify-center">
              <div className="text-2xl font-bold mb-8	text-center">
                Update user detail
              </div>
              <Card className="min-w-96">
                <Form>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      type="text"
                      placeholder="Email"
                      color={errors.email && touched.email ? 'failure' : ''}
                      value={formik.values.email}
                      disabled
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput
                      id="name"
                      type="text"
                      placeholder="Name"
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

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      className={
                        !isValid || loading ? 'disabled-btn mr-2' : 'mr-2'
                      }
                      disabled={!isValid || loading}
                    >
                      {loading ? <Spinner /> : 'Update'}
                    </Button>

                    <Link href={`/users/${userDetail.id}`}>
                      <Button type="button" className="ml-2">
                        Back
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card>
            </div>
          </Fragment>
        );
      }}
    </Formik>
  );
}
