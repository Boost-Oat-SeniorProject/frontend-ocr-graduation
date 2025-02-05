'use client'
import { useState, useRef } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {TableShowGradeComponent} from "../components/TableShowGradeComponent"
import { ResultDashboardComponent } from "../components/ResultDashboardComponent";
export default function Grade(){
    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [studentID, setStudentID] = useState<string>()

    const subjectGroups = [
        {
            subjectGroupName: "หมวดวิชาศึกษาทั่วไป",
            subsubjectGroup : [
                "กลุ่มสาระอยู่ดีมีสุข",
                "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ",
                "กลุ่มสาระภาษากับการสื่อสาร",
                "กลุ่มสาระพลเมืองไทยและพลเมืองโลก",
                "กลุ่มสาระสุนทรียศาสตร์",
                "เลือกรายวิชาใน 5 กลุ่มสาระ",
            ]
        },
        {
            subjectGroupName: "หมวดวิชาเฉพาะ",
            subsubjectGroup : [
                "วิชาแกน",
                "วิชาเฉพาะบังคับ",
                "วิชาเฉาะเลือก"
            ]
        },
        {
            subjectGroupName: "หมวดวิชาเลือกเสรี",
            subsubjectGroup : [
                "วิชาเลือกเสรี"
            ]
        },
        {
            subjectGroupName: "ไม่มีในหมวดวิชา",
            subsubjectGroup : [
                "วิชาที่ไม่มีในระบบ"
            ]
        }
    ]

    return (
        <main>
           <div className="dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-center my-4">ผลลัพท์การตรวจสอบใบรายงานคะแนน</h1>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-3 gap-2">
                <div><span className="font-bold text-lg">ชื่อ</span> : siwakorn</div>
                <div><span className="font-bold text-lg">นามสกุล</span> : pasawang</div>
                <div><span className="font-bold text-lg">รหัสนิสิต</span> : 6410451423</div>
                <ResultDashboardComponent title="หมวดวิชาศึกษาทั่วไป" />
                <ResultDashboardComponent title="หมวดวิชาเฉพาะ" />
                <ResultDashboardComponent title="หมวดวิชาเลือกเสรี" />
            </div>
            <hr className="w-4/5 mx-auto my-6 border-black dark:border-white"/>
            {
                subjectGroups.map((subjectGroup)=>
                    <TableShowGradeComponent key={subjectGroup.subjectGroupName} title={subjectGroup.subjectGroupName} subGroupList={subjectGroup.subsubjectGroup}/>
                )
            }
           </div>
        </main>
    )
}