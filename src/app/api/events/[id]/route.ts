import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Return empty event structure (or even just `{}` if you want)
  return NextResponse.json({
    eventName: '',
    type: '',
    teamSize: '',
    description: '',
    rules: '',
    maxRegistration: '',
    coordinatorSize: '',
    status: ''
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  console.log('Received update:', body);

  // Simulate saving to database
  return NextResponse.json({ message: 'Event updated successfully', data: body });
}
