"use client";
import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [openNote, setOpenNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content) return;
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/notes/${editing.id}` : "/api/notes";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setEditing(null);
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setTitle("");
    setContent("");
    setEditing(null);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditing(note);
  };

  return (
    <div className="relative bg-black h-full min-h-[100vh]">
      <div
        className={`max-w-5xl mx-auto p-4 transition duration-200 ${
          openNote ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Notes
        </h1>

        {/* Form */}
        <div className="mb-6">
          <input
            className="border p-2 w-full mb-2 rounded-lg bg-gray-200 text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="border p-2 w-full mb-2 rounded-lg bg-gray-200 text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            {editing ? "Update Note" : "Add Note"}
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setOpenNote(note)}
              className="border border-white rounded-lg p-4 cursor-pointer  bg-black bg-opacity-60 hover:shadow-md transition backdrop-blur-sm"
            >
              <h2 className="text-lg text-white font-semibold truncate">
                {note.title}
              </h2>
              <p className="text-sm mt-1 line-clamp-4 text-gray-400">
                {note.content}
              </p>
              <div className="flex justify-between mt-4 text-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(note);
                  }}
                  className="text-blue-600 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                  className="text-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openNote && (
        <div
          onClick={() => setOpenNote(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 max-w-md w-full shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4 break-words">
              {openNote.title}
            </h2>

            <p className="text-gray-800 whitespace-pre-wrap break-words">
              {openNote.content}
            </p>

            <button
              onClick={() => setOpenNote(null)}
              className="mt-6 text-blue-600 hover:underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
