import { apiUrl } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const response = await fetch(`${apiUrl}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestJson),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
