import UserList from '@/components/UserList/UserList';
import { User } from '@/models/user.model';
import { apiUrl } from '@/utils/constants';
import { auth } from '@/auth';
import { Suspense } from 'react';
import { Spinner } from 'flowbite-react';

async function fetchUsers(token: string) {
  const response = await fetch(`${apiUrl}/user/list`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bear ' + token,
    },
    next: { revalidate: 0 },
  });

  const data: User[] = await response.json();

  return {
    data: response.ok ? data : [],
    error: data,
    status: response.status,
  };
}

const Users = async () => {
  const session = await auth();
  const { data, error, status } = await fetchUsers(session?.token as string);

  if (status === 401) {
    throw new Error('unAuthorized');
  }

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner />
        </div>
      }
    >
      <UserList users={data}></UserList>
    </Suspense>
  );
};
export default Users;
