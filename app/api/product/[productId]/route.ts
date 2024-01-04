import { apiUrl } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const requestJson = await request.json();
  const response = await fetch(`${apiUrl}/product/${params.productId}`, {
    method: 'PUT',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const response = await fetch(`${apiUrl}/product/${params.productId}`, {
    method: 'DELETE',
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
