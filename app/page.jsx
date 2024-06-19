"use client";

import Navbar from "@/Components/Navbar";
import Notes from "@/Components/Notes";
import Wrapper from "@/Components/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [title, setTitle] = useState("");
  const [myNotes, setMyNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [currTitle, setCurrTitle] = useState("");
  const [currNote, setCurrNote] = useState("");
  const [currId, setCurrId] = useState("");
  //add notes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api", { title, myNotes });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Could Not Add Note");
    }
    console.log({ title, myNotes });
    setLoading(false);
    setTitle("");
    setMyNotes("");
    await fetchNotes();
  };

  //fetch notes
  const fetchNotes = async () => {
    setNotesLoading(true);
    const response = await axios.get("/api");
    setNotesData(response.data.theNotes);
    setNotesLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //delete notes
  const deleteNotes = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        id: id,
      },
    });
    toast.success(response.data.message);
    fetchNotes();
  };

  const openModal = (note) => {
    setEditMode(true);
    setCurrTitle(note.title);
    setCurrNote(note.myNotes);
    setCurrId(note._id);
  };

  const handleEditNotes = async (id) => {
    try {
      const response = await axios.put("/api", {
        id: id,
        title: currTitle,
        myNotes: currNote,
      });
      toast.success(response.data.message);
      fetchNotes(); // Refresh the notes list
      setEditMode(false);
    } catch (error) {
      console.error("Error editing note:", error);
      toast.error("Could not Edit");
    }
  };
  return (
    <div className='w-full min-h-screen py-4 lg:px-[25vw] px-4 text-white bg-zinc-900'>
      <Toaster duration={2500} position="top-center" />

      <Navbar />
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 mt-4"
      >
        <label htmlFor="Title">
          <p className="font-semibold text-lg">Title</p>
          <input
            type="text"
            placeholder="Enter Title"
            name="Enter Title"
            className="p-2 text-black bg-slate-200 rounded-md w-full border-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="Todo">
          <p className="font-semibold text-lg ">Write Your Notes</p>
          <textarea
            placeholder="Enter Your Notes"
            className="w-full text-black bg-slate-200 p-2 rounded-md border border-black"
            name="notes"
            value={myNotes}
            onChange={(e) => setMyNotes(e.target.value)}
            rows={5}
          ></textarea>
        </label>
        <button className="w-full bg-blue-700 p-2 rounded-md font-bold">
          {loading ? "Adding" : "Add"}
        </button>
      </form>
      <h1 className="mt-4 font-bold text-xl">Here Are The notes</h1>
      <div className="todos w-full flex flex-col gap-3 mt-4">
        {notesLoading ? (
          <div className="w-full items-center">Loading...</div>
        ) : (
          notesData?.map((item, index) => (
            <div key={index}>
              <Notes
                createdAt={item.createdAt}
                description={item.myNotes}
                title={item.title}
                id={item._id}
                onDelete={() => deleteNotes(item._id)}
                onEdit={() => openModal(item)}
              />
            </div>
          ))
        )}
      </div>
      {editMode && (
        <div className="home p-4 top-0 left-0 bg-opacity-50 flex flex-col gap-2 items-center justify-center fixed h-screen w-full bg-slate-900">
          <form className="lg:w-1/2 w-full lg:h-1/2 p-3 text-black flex flex-col gap-3 rounded-md bg-slate-200">
            <label htmlFor="Title">
              <p className="font-semibold text-lg">Title</p>
              <input
                type="text"
                placeholder="Enter Title"
                name="Enter Title"
                className="p-2 text-black bg-slate-200 border rounded-md w-full border-black"
                value={currTitle}
                onChange={(e) => setCurrTitle(e.target.value)}
              />
            </label>
            <label htmlFor="Todo">
              <p className="font-semibold text-lg ">Edit Your Notes</p>
              <textarea
                placeholder="Enter Your Notes"
                className="w-full text-black bg-slate-200 p-2 rounded-md border border-black"
                name="notes"
                value={currNote}
                onChange={(e) => setCurrNote(e.target.value)}
                rows={5}
              ></textarea>
            </label>
          </form>
          <div className="flex items-center gap-3">
            {" "}
            <button
              className="p-2 bg-red-500 rounded-md"
              onClick={() => setEditMode(false)}
            >
              Close Editor
            </button>
            <button
              className="p-2 bg-green-600 rounded-md"
              onClick={() => handleEditNotes(currId)}
            >
              Save Notes
            </button>
          </div>
        </div>
      )}
   </div>
  );
}
