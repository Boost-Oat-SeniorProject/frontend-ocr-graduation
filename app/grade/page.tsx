'use client'
import { useState, useRef } from "react";
import { ShowGradeComponent } from "../components/ShowGradeComponent";
import { ShowProfileComponent } from "../components/ShowProfileComponent";
import { Alert } from "@nextui-org/alert";
import { Tooltip } from "@nextui-org/tooltip";

export default function Grade(){
    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [studentID, setStudentID] = useState<string>()

    return (
        <main>
            <ShowProfileComponent/>
            <br />
            <ShowGradeComponent/>
            <br />
            <div className="max-w-[750px] mx-auto p-2 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl text-center">
                <Tooltip content="ยืนยันการทำใบตรวจสอบหลักสูตร" color="success">
                    <button className="bg-green-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-green-500 hover:ease-out duration-300 hover:ring-4 hover:ring-green-500 focus:ring-offset-2 text-white">ยืนยัน</button>
                </Tooltip>
                <Tooltip content="ยกเลิกเพื่อตรวจสอบใบรายงานคะแนนใหม่" color="danger">
                    <button className="bg-red-600 mx-2 px-3 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:ease-out duration-300 hover:ring hover:ring-red-500 focus:ring-offset-2 text-white">ยกเลิก</button>
                </Tooltip>
            </div>
        </main>
    )
}