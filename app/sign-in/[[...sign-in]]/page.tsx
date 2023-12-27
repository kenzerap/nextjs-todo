import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center mt-8">
      <div>
        <div>Note: admin account: hoangadmin@yopmail.com - Abcdf123!@#</div>
        <SignIn />
      </div>
    </div>
  );
}
