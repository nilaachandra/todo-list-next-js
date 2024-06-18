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
  const [loading, setLoading] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api", { title, myNotes });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Could Not Add the Note");
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
  return (
    <Wrapper>
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
              {editMode ? (
                <div className="w-full rounded-md bg-slate-200 text-black p-2">

                <input type="text" value={p} className="text-lg font-semibold "/>
                <p className="text-sm mt-1">{description}</p>
                <ul className="flex gap-2 text-sm mt-1">
                  <li className="underline  cursor-pointer hover:text-blue-700 duration-200 transition-all">
                    Edit
                  </li>
                  <li
                    className="underline cursor-pointer hover:text-blue-700 duration-200 transition-all"
                    onClick={onDelete}
                  >
                    Delete
                  </li>
                </ul>
        
            </div>
              ) : (
                <Notes
                  createdAt={item.createdAt}
                  description={item.myNotes}
                  title={item.title}
                  id={item._id}
                  onDelete={() => deleteNotes(item._id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </Wrapper>
  );
}
