import React from 'react'

const Notes = () => {
  return (
    <div className="w-full rounded-md bg-slate-200 text-black p-2">
          <h1 className="text-lg font-semibold ">Here Goes the Title</h1>
          <p className="text-sm mt-1">Here Goes the Description</p>
          <ul className="flex gap-2 text-sm mt-1">
            <li className="underline  hover:text-blue-700 duration-200 transition-all">Edit</li>
            <li className="underline hover:text-blue-700 duration-200 transition-all">Delete</li>
          </ul>
        </div>
  )
}

export default Notes