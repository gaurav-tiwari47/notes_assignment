import { NextRequest, NextResponse } from 'next/server';
import { Note, notes } from '@/model/note';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newNote: Note = {
    id: uuidv4(),
    title: body.title,
    content: body.content,
  };
  notes.push(newNote);
  return NextResponse.json(newNote, { status: 201 });
}
