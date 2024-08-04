'use client'
import { useRef, useState } from "react";

export function DragDropFileComponent(){

  const [files, setFiles] = useState<Object>();
  const [dragActive, setDragActive] = useState<boolean>(false);

  function handleDragOver(e: any){
    e.preventDefault();
    setDragActive(true)
  }

  function handleDragLeave(e: any){
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e: any){
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.items){
      [...e.dataTransfer.items].forEach((item, i)=>{
        if (item.kind == "file"){
          let file = item.getAsFile()
          console.log(file)
          setFiles(file)
        }
      })
    }

    console.log(files)
  }

  const list = []
  for(let i=0; i<10; i++){
    list.push(<li className="dark:bg-[#002222] bg-[#b0eeee] shadow-sm odd:shadow-gray-500 p-1 max-w-96 mx-auto my-2 dark:hover:bg-gray-700 hover:bg-green-400">FilePath</li>)
  }

    return (
        <div className="max-w-[500px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl relative">

            { /* Header in UI of choosing file */ }
            <div className="font-bold p-3 text-xl">
              Add Transcript Files
            </div>


            {/* Area of Dragged and Dropped File */}
            <div className={`border-[#003333] dark:border-white border-2 border-dashed max-w-96 h-40 mx-auto ${dragActive ? "dark:bg-gray-500 bg-gray-300" : "bg-transparent"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnd={handleDragLeave}
                  onDrop={handleDrop}
            >
            </div>

            <div className="my-2">
              <ul>
                {list}
              </ul>
            </div>

            <div className="right-0 bottom-0 flex flex-row-reverse p-2 relative w-full">
              <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white">Generate</button>
              <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white">Cancel</button>
            </div>


      </div>
    )
}