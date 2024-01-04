import { auth } from '@/auth';
import { apiUrl } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await auth();
  const token = session?.token as string;
  const response = await fetch(`${apiUrl}/user/${params.userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bear ' + token,
    },
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json(data);
  }

  return NextResponse.json(data, { status: response.status });
}
