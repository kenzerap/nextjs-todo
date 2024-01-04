import { apiUrl } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const response = await fetch(`${apiUrl}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestJson),
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json(data);
  }

  return NextResponse.json(data, { status: response.status });
}
