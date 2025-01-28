'use client'
import { useState, DragEvent, SyntheticEvent, useRef, use} from "react";
import { Tooltip, Alert, Spinner, Progress } from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion"

export default function Home() {
  const [files, setFiles] = useState<Array<File>>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null)
  const [isErrorAlert, setErrorAlert] = useState<Boolean>(false)
  const [textAlert, setTextAlert] = useState<string>("")
  const [isLoading, setLoading] = useState<Boolean>()

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
        const currentFile = e.dataTransfer.files[i]
        console.log(currentFile)
        if(currentFile.type === "application/pdf"){
          let find_file = files.find((file)=>{return file.name == currentFile.name})
          if (!find_file){
            setFiles((files: any)=>[...files, currentFile]);
          }
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
          let find_file = files.find((file)=>{return file.name == new_files[i].name})
          if (!find_file){
            setFiles((files: any)=>[...files, new_files[i]]);
          }
        }
      }

    }catch(error){
      alert(`Error: ${error}`)
    }
  }


  // TODO Upload one file funciton
  // ! It doesn't have a api path for post methed yet, so You should set a path in fetch function.
  const handleUpload = async () => {
    setLoading(true)
    if (files.length === 0){
      setLoading(false)
      noticeUploadfile("กรุณาใส่ไฟล์ใบรายงานคะแนน")
      return
    }

    const formData = new FormData();
    for(let i=0; i<files.length; i++){
      formData.append("file", files[i]);
    }
    
    try{
      const result = await fetch("http://localhost/extract",{
        method: 'POST',
        body: formData
      });

      const data = await result.json();
      console.log(data);
      setLoading(false)
      alert("Success")
    } catch(error){
      setLoading(false)
      noticeUploadfile("อ่านไฟล์ไม่สำเร็จ")
    }
  }

  const noticeUploadfile = (text:string) => {
    setErrorAlert(true)
    setTextAlert(text)
    setTimeout(() => {
      setErrorAlert(false)
      setTextAlert("")
    }, 5000);
  }

    return (
      <main>
        <div className="max-w-[500px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl relative grid grid-cols-1 content-between">

          { /* Header in UI of choosing file */ }
            <div className="font-bold p-3 text-2xl text-center">
              อัพโหลดไฟล์ใบรายงานผล
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

                <p className="relative top-1/2 translate-y-[-50%] text-center">ลากไฟล์หรือกดพื้นที่นี้เพื่ออัพโหลดไฟล์</p>
            </div>

            {/**Show files which are draged and drop in this area */}
            <ul className={`${files.length > 0 ? "overflow-y-scroll max-h-64 block" : "hidden"}  accent-black w-5/6 m-auto my-4 `}>
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
              <Tooltip content="อ่านใบรายงานคะแนนนิสิต" color="success">
                  <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white" onClick={handleUpload}>ตรวจสอบ</button>          
              </Tooltip>
              <Tooltip content="ล้างไฟล์ใบรายงานคะแนนทั้งหมด" color="danger">
                  <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white" onClick={handleClearFiles}>ล้างไฟล์</button>
              </Tooltip>
            </div>
        </div>
        {/* <div className={`${isErrorAlert ? "opacity-100":"opacity-0"} flex items-center justify-center w-1/2 absolute top-8 left-1/2 -translate-x-1/2`}>
          <Alert description={textAlert} title={"คำเตือน"} variant={'solid'} color="warning" classNames={{title: "motion-safe:animate-bounce"}}/>
        </div> */}

        <AnimatePresence>
          {
            isErrorAlert &&
            <motion.div className="absolute top-8 w-full" initial={{opacity: 0, y: 0, }} animate={{opacity:1, y: 10}} exit={{opacity:0, y:0}} transition={{duration:0.3, ease:"linear"}}>
              <Alert description={textAlert} title={"แจ้งเตือน"} variant={'solid'} color="warning" classNames={{title: "motion-safe:animate-bounce font-bold", base:"w-1/2 relative left-1/2 -translate-x-1/2"}}/>
            </motion.div>
          }

          {
            isLoading &&
            <motion.div className="absolute top-0 w-full h-full bg-black/50" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Progress isIndeterminate size="lg" className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2" label="Loading..." classNames={{track:"bg-green-500"}}/>
            </motion.div>
          }
        </AnimatePresence>

      </main>
    )
}
