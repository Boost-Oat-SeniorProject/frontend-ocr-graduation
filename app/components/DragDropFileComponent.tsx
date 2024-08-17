'use client'
import { useRef, useState, DragEvent } from "react";

export function DragDropFileComponent(){

  const [files, setFiles] = useState<Array<File>>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  function handleDragOver(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    setDragActive(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]){

      // TODO drop multiple files
      // for(let i=0; i<e.dataTransfer.files.length; i++){
      //   const file = e.dataTransfer.files[i]
      //   console.log(file)
      //   if(file.type === "application/pdf"){
      //     setFiles((files: any)=>[...files, file]);
      //   }
      // }
      
      // TODO drop a file only
      const file = e.dataTransfer.files[0];
      if(file.type === "application/pdf" && files.length == 0){
        setFiles((files:any) => [...files, file])
      }
    }
  }

  const handleDelectFileByIndex = (index: Number) =>{
    setFiles(oldFiles => {
      return oldFiles.filter((_, i) => i !== index)
    })
  }

  function handleClearFiles(e:any){
    setFiles([]);
  }

  // TODO Upload one file funciton
  // * It doesn't have a api path for post methed, so You should set a path in fetch function.
  const handleUpload = async () => {
    if (files){
      console.log("Uploading file...");
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    
    try{
      const result = await fetch("localhost:.../extract",{
        method: 'POST',
        body: formData
      });

      const data = await result.json();
      console.log(data);
      alert("Successful")
    } catch(error){
      console.error(error);
      alert("Error")
    }
  }

    return (
        <div className="max-w-[500px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl relative flex flex-col">

            { /* Header in UI of choosing file */ }
            <div className="font-bold p-3 text-xl">
              Add Transcript Files
            </div>


            {/* Area of Dragged and Dropped File */}
            <div className={`border-[#003333] dark:border-white border-2 border-dashed max-w-96 h-40 mx-auto w-full ${dragActive ? "dark:bg-gray-500 bg-gray-300" : "bg-transparent"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnd={handleDragLeave}
                  onDrop={handleDrop}
            >
              {/* <input type="file"
                    accept=".pdf"
                    className="w-full h-full border border-white hidden hover:visible"
                    placeholder="helloworld"
                    onChange={(e)=>{
                      console.log(e.target.files)
                    }}
                /> */}

                <p className="relative top-1/2 translate-y-[-50%] text-center">Drag and Drop file in this Area</p>
            </div>


            {/**Show files which are draged and drop in this area */}
            <ul className={`h-40  ${files.length > 5 ? "overflow-y-scroll" : "overflow-y-hidden"}`}>
              {
               files.map((file, index) => (
                  <li key={index} className="bg-black m-2 p-2 flex flex-row">
                    <div className="flex-auto">
                      {file.name}
                    </div>
                    <div className="border border-red-500 flex-none w-7 text-center hover:bg-gray-500">
                      <button onClick={()=>handleDelectFileByIndex(index)}>X</button>
                    </div>
                  </li>
                ))
              }
            </ul>
            
            {/**Submit files button and clear files button*/}
            <div className="right-0 bottom-0 flex flex-row-reverse p-2 relative w-full">
              <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white" onClick={handleUpload}>Generate</button>
              <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white" onClick={handleClearFiles}>Clear</button>
            </div>


      </div>
    )
}