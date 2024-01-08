import RefreshToken from '@/components/RefreshToken/RefreshToken';
import { User } from '@/models/user.model';
import { apiUrl } from '@/utils/constants';
import { auth } from '@/auth';
import UserDetailEditForm from '@/components/UserDetailEditForm/UserDetailEditForm';

async function fetchUserById(userId: string, token: string) {
  const response = await fetch(`${apiUrl}/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bear ' + token,
    },
    next: { revalidate: 0 },
  });

  const data: User = await response.json();

  return {
    data: response.ok ? data : null,
    error: data,
    status: response.status,
  };
}

const UserDetailEdit = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const {
    data: userDetail,
    error,
    status,
  } = await fetchUserById(params.userId, session?.token as string);

  return status === 401 ? (
    <RefreshToken></RefreshToken>
  ) : (
    status === 200 && userDetail && (
      <UserDetailEditForm userDetail={userDetail}></UserDetailEditForm>
    )
  );
};
export default UserDetailEdit;
