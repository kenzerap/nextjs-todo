import RefreshToken from '@/components/RefreshToken/RefreshToken';
import { User } from '@/models/user.model';
import { apiUrl } from '@/utils/constants';
import { Card } from 'flowbite-react';
import classes from './UserDetail.module.css';
import { auth } from '@/auth';

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

const UserDetail = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const {
    data: userDetail,
    error,
    status,
  } = await fetchUserById(params.userId, session?.token as string);

  return status === 401 ? (
    <RefreshToken></RefreshToken>
  ) : (
    <div className={classes.layout}>
      <div className="text-2xl font-bold mb-8	">User detail</div>
      <Card>
        <div>
          <span className="font-bold"> Email: </span> {userDetail?.email}
        </div>
        <div>
          <span className="font-bold"> Name: </span>
          {userDetail?.name}
        </div>
        <div>
          <span className="font-bold"> Phone: </span>
          {userDetail?.phone}
        </div>
        <div>
          <span className="font-bold"> Address: </span>
          {userDetail?.address}
        </div>
      </Card>
    </div>
  );
};
export default UserDetail;
