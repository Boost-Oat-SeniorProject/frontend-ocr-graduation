'use client'
import { useState, DragEvent, SyntheticEvent, useRef, use, ChangeEvent, useActionState, useEffect} from "react";
import { Tooltip, Alert, Progress } from "@heroui/react";
import {AnimatePresence, motion} from "framer-motion"
import { handleUpload } from "./actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const initState ={
    message: "",
    isNotPass: false,
    result: null, // result of fetch pass
  }
  const [file, setFile] = useState<File | null>()
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<any>(null)
  const [isErrorAlert, setErrorAlert] = useState<Boolean>(false)
  const [textAlert, setTextAlert] = useState<string>("")
  const [state, formAction, pending] = useActionState(handleUpload, initState)
  const router = useRouter()

  useEffect(()=>{
    if (state.isNotPass){
      noticeUploadfile(state.message)
    }else{
      if (state.result !== null){
        console.log(state.result)
        localStorage.setItem("data", JSON.stringify(state.result))
        router.push("/grade")
      }
    }
    setFile(null)
  }, [state])

  function handleDragOver(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const openFileExplorer = () =>{
    inputRef.current.value = "";
    inputRef.current.click();
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>){
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    const newFile = event.dataTransfer.files[0]
    if (newFile && newFile.type === "application/pdf"){
      setFile(newFile)
    }
  }

  async function handleChangeFiles(event : SyntheticEvent){
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    let newFiles : FileList | null= (event.target as HTMLInputElement).files
    
    if (newFiles === null){
      noticeUploadfile("ไม่มีไฟล์ใบรายงานคะแนน")
      return
    }
    const newFile = newFiles[0]
    if (newFile && newFile.type === "application/pdf"){
      setFile(newFile)
    }
    console.log(newFile)
  }

  const noticeUploadfile = (text:string) => {
    setErrorAlert(true)
    setTextAlert(text)
    setTimeout(() => {
      setErrorAlert(false)
      setTextAlert("")
    }, 3000);
  }

    return (
      <main>
        <AnimatePresence>
          {
            isErrorAlert &&
            <motion.div className="absolute top-14 w-full z-20" initial={{opacity: 0, y: 0, }} animate={{opacity:1, y: 10}} exit={{opacity:0, y:0}} transition={{duration:0.3, ease:"linear"}}>
               <Alert description={textAlert} title={"แจ้งเตือน"} variant={'solid'} color="warning" classNames={{title: "motion-safe:animate-bounce font-bold", base:"w-1/2 relative left-1/2 -translate-x-1/2"}}/>
             </motion.div>
          }
    
          {
            pending &&
            <motion.div className="absolute top-0 w-full h-full bg-black/50 z-50" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}>
               <Progress isIndeterminate size="lg" className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2" label="Loading..." classNames={{track:"bg-green-500"}}/>
            </motion.div>
          }
        </AnimatePresence>

        <div className="max-w-[500px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] relative top-20 rounded-2xl grid grid-cols-1">
          <form action={formAction}>
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
                    name="file"
                />

                <p className="relative top-1/2 translate-y-[-50%] text-center">ลากไฟล์หรือกดพื้นที่นี้เพื่ออัพโหลดไฟล์</p>
            </div>
            
          <div className="h-1/4 bg-black my-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            {file?.name}
          </div>

            {/**Submit files button and clear files button*/}
            <div className="flex flex-row-reverse p-2 w-full">
              <Tooltip content="อ่านใบรายงานคะแนนนิสิต" color="success">
                  <button type="submit" disabled={pending} className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white">ตรวจสอบ</button>          
              </Tooltip>
              <Tooltip content="ล้างไฟล์ใบรายงานคะแนนทั้งหมด" color="danger">
                  <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white">ล้างไฟล์</button>
              </Tooltip>
            </div>
          </form>
        </div>


      </main>
    )
}
