import { connectDB } from '@/lib/dbConnect';
import { Note } from '@/model/note';
import { NextRequest, NextResponse } from 'next/server';

// PUT: Update a note by ID
export async function PUT(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const body = await request.json();

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, body, { new: true });
    if (!updatedNote) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating note', error }, { status: 500 });
  }
}

// DELETE: Delete a note by ID
export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting note', error }, { status: 500 });
  }
}