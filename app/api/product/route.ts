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

  if (response.ok) {
    return NextResponse.json(data);
  }

  return NextResponse.json(data, { status: response.status });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.search;
  const response = await fetch(`${apiUrl}/product/list${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json(data);
  }

  return NextResponse.json(data, { status: response.status });
}
