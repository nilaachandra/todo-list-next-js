import { connectDB } from "@/lib/config/db";
import NotesModel from "@/lib/models/notesmodel";
import { NextResponse } from "next/server";

// Function to handle GET requests
export async function GET(request) {
  await connectDB(); // Connect to the database
  const theNotes = await NotesModel.find({});
  return NextResponse.json({ theNotes: theNotes });
}

// Function to handle POST requests
export async function POST(request) {
  await connectDB(); // Connect to the database
  try {
    const { title, myNotes } = await request.json(); // Parse request body
    await NotesModel.create({
      title,
      myNotes,
      createdAt: new Date(),
    });
    return NextResponse.json({
      message: "Your Notes Have been added successfully",
    });
  } catch (error) {
    console.error("Error creating Notes: ", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

//function to edit notee
export async function PUT(request) {
  await connectDB(); // Ensure the database connection

  try {
    const noteId = request.nextUrl.searchParams.get('id');
    const { id, title, myNotes } = await request.json(); // Parse request body

    const result = await NotesModel.findByIdAndUpdate(
      id,
      { title, myNotes },
      { new: true } // Return the updated document
    );

    if (!result) {
      return NextResponse.json({ message: "Could not edit!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note edited successfully", note: result });
  } catch (error) {
    console.error("Error editing note:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
//fucntion to delete notes
export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    const result = await NotesModel.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Could not delete!" });
    }
    return NextResponse.json({
      message: "Your Notes Have been deleted successfully",
    });
   
  } catch (error) {
    console.error("Error deleting Notes: ", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
