'use client';

import React, { Fragment, useState } from 'react';
import { Card, Spinner, Table } from 'flowbite-react';
import { User } from '../../models/user.model';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserList({ users }: { users: User[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const deleteUserHandler = async (userId: string) => {
    console.log('deleteUserHandler: ', userId);
    const url = `/api/users/${userId}`;
    const method = 'DELETE';

    setDeleting(true);
    const res = await fetch(url, {
      method: method,
    });

    setDeleting(false);

    if (res.ok) {
      router.replace('/users');
    }

    const data = await res.json();

    console.log('data: ', data.message);
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">User list</div>
        <div></div>
      </div>

      <Card className="overflow-x-auto">
        {!users ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>role</Table.HeadCell>
              <Table.HeadCell>status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {(users || []).map((user) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={user.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? 'Admin' : 'User'}</Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell>
                      {!user.isAdmin && (
                        <Link
                          href={''}
                          onClick={() => deleteUserHandler(user.id)}
                          className={`font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-4 ${
                            deleting ? 'pointer-events-none' : ''
                          }`}
                        >
                          Delete
                        </Link>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Card>
    </Fragment>
  );
}
