import { auth } from '@/app/api/auth/[...nextauth]/route';
import UserList from '@/components/UserList/UserList';
import { User } from '@/models/user.model';
import { apiUrl } from '@/utils/constants';
import RefreshToken from '@/components/RefreshToken/RefreshToken';

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

  return status === 401 ? (
    <RefreshToken></RefreshToken>
  ) : (
    <UserList users={data}></UserList>
  );
};
export default Users;
