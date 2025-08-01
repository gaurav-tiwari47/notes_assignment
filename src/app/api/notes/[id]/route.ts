import { NextRequest, NextResponse } from 'next/server';
import { Note, notes } from '@/model/note';// Install with: npm install uuid


// PUT: Update a note
export async function PUT(request: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Note not found' }, { status: 404 });
  }

  notes[index] = { ...notes[index], ...body };
  return NextResponse.json(notes[index]);
}

// DELETE: Delete a note
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Note not found' }, { status: 404 });
  }

  notes.splice(index, 1);
  return NextResponse.json({ success: true });
}
