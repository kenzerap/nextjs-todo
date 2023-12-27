import UserList from '@/components/UserList/UserList';
import { checkRole } from '@/utils/roles';
import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Users = () => {
  const { sessionClaims } = auth();
  console.log('sessionClaims: ', sessionClaims);

  if (!checkRole('admin')) {
    redirect('/');
  }

  return <UserList users={[]}></UserList>;
};
export default Users;
