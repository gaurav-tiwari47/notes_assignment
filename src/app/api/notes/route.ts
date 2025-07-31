import { connectDB } from '@/lib/dbConnect';
import { Note } from '@/model/note';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  await connectDB();
  const { title, content } = await req.json();
  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}
