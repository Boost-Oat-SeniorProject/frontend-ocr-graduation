'use client'
import { useRef, useState, DragEvent, SyntheticEvent, SetStateAction } from "react";

export function DragDropFileComponent(){

  const [files, setFiles] = useState<Array<File>>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null)

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
      for(let i=0; i<e.dataTransfer.files.length; i++){
        const file = e.dataTransfer.files[i]
        console.log(file)
        if(file.type === "application/pdf"){
          setFiles((files: any)=>[...files, file]);
        }
      }
      
      // TODO drop a file only
      // const file = e.dataTransfer.files[0];
      // if(file.type === "application/pdf" && files.length == 0){
      //   setFiles((files:any) => [...files, file])
      // }
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

  const openFileExplorer = () =>{
    inputRef.current.value = "";
    inputRef.current.click();
  }

  const handleChangeFiles = (e: SyntheticEvent) =>{
    let new_files : FileList | null = (e.target as HTMLInputElement).files

    try{
      if(new_files === null){
        throw "No file"
      }
      
      for(let i=0; i<new_files.length; i++){
        if (new_files[i].type === "application/pdf"){
          setFiles((files: any)=>[...files, new_files[i]]);
        }
      }

    }catch(error){
      alert(`Error: ${error}`)
    }
  }


  // TODO Upload one file funciton
  // ! It doesn't have a api path for post methed yet, so You should set a path in fetch function.
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
            <div className="font-bold p-3 text-xl text-center">
              Add Transcript Files
            </div>


            {/* Area of Dragged and Dropped File */}
            <div className={`border-[#003333] dark:border-white border-2 border-dashed max-w-96 h-40 mx-auto w-full dark:hover:bg-slate-500 hover:bg-slate-300 hover:cursor-pointer ${dragActive ? "dark:bg-gray-500 bg-gray-300" : "bg-transparent"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnd={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileExplorer}
            >
              <input type="file"
                    accept=".pdf"
                    className="w-full h-full border border-white hidden hover:visible"
                    placeholder="helloworld"
                    onChange={handleChangeFiles}
                    ref={inputRef}
                    multiple={true}
                />

                <p className="relative top-1/2 translate-y-[-50%] text-center">Drag and Drop file or Click in this Area</p>
            </div>


            {/**Show files which are draged and drop in this area */}
            <ul className={`${files.length > 0 ? "overflow-y-scroll max-h-64 block" : "hidden"}  accent-black w-5/6 m-auto my-4`}>
              {
               files.map((file, index) => (
                  <li key={index} className="dark:bg-black m-2 p-2 flex flex-row bg-green-500">
                    <div className="flex-auto truncate text-sm my-auto">
                      {file.name}
                    </div>
                    <div className="border border-red-500 flex min-w-8 h-8 hover:bg-gray-500 text-base hover:cursor-pointer font-bold">
                      <p onClick={()=>handleDelectFileByIndex(index)} className="m-auto">X</p>
                    </div>
                  </li>
                ))
              }
            </ul>
            
            {/**Submit files button and clear files button*/}
            <div className="flex flex-row-reverse p-2 w-full">
              <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white" onClick={handleUpload}>Generate</button>
              <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white" onClick={handleClearFiles}>Clear</button>
            </div>


      </div>
    )
}