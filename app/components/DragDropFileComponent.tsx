'use client'
import { useRef, useState } from "react";

export function DragDropFileComponent(){

    return (
        <div className="max-w-[500px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl relative">
        <div className="font-bold p-3">
          Add Transcript Files
        </div>

        <input type="file" className="border-[#003333] dark:border-white border-2 border-dashed w-full h-40"/>

        <div className="right-0 bottom-0 flex flex-row-reverse p-2 absolute">
          <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2">Generate</button>
          <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2">Cancel</button>
        </div>
      </div>
    )
}