import { UserProfile } from '@clerk/nextjs';

const Profile = () => {
  return (
    <div className="flex justify-center mt-8">
      <UserProfile />
    </div>
  );
};
export default Profile;
