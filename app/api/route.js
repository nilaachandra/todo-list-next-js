import { connectDB } from "@/lib/config/db";
import NotesModel from "@/lib/models/notesmodel";
import { NextResponse } from "next/server";

//load the db
const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function GET(request) {
  return NextResponse.json({ msg: "get method hit" });
}

export async function POST(request) {
  try {
    const { title, myNotes } = await request.json();
    await NotesModel.create({
      title: title,
      myNotes: myNotes,
      createdAt: new Date(),
    });
    return NextResponse.json({
      message: "Your Notes Have been added successfully",
    });
  } catch (error) {
    console.error("Error creating notes:", error);
  }
}
