'use client';

import React, { Fragment, useState } from 'react';
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [initialValues] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required'),

    password: Yup.string()
      .min(5, 'Password min length 5 characters.')
      .required('This field is required'),
  });

  const submitForm = async (data: any) => {
    setLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log('res: ', res);
    setLoading(false);

    if (res?.ok) {
      router.push('/');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid } = formik;
        return (
          <Fragment>
            <div className="m-8 grid justify-center">
              <div className="text-2xl font-bold mb-8	text-center">Login</div>
              <div>Note: admin account: admin@yopmail.com - 123456</div>
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
                      <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      color={
                        errors.password && touched.password ? 'failure' : ''
                      }
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mt-4 mb-4">
                    <Link href={'/signup'} className="text-blue-600 underline">
                      Sign up
                    </Link>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      className={
                        !isValid || loading ? 'disabled-btn mr-2' : 'mr-2'
                      }
                      disabled={!isValid || loading}
                    >
                      {loading ? <Spinner /> : 'Login'}
                    </Button>

                    <Link href={'/'}>
                      <Button type="button" className="ml-2">
                        Cancel
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
