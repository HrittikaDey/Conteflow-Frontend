import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Twitter posting is not configured yet' },
    { status: 501 }
  );
}
