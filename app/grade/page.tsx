'use client'
import { useState, useRef, useEffect } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {TableShowGradeComponent} from "../components/TableShowGradeComponent"
import { ResultCreditDashboardComponent } from "../components/ResultCreditDashboardComponent";
import { SubjectGroupTableBodyComponent } from "../components/SubjectGroupTableBodyComponent";
import { ResultGraduateDashboard } from "../components/ResultGraduateDashboard";
import { ResultGradeDashboardComponent } from "../components/ResultGradeDashboardComponent";
import { div } from "framer-motion/client";

type NotCourseObject = {
    courseName: string,
    courseId: string,
    grade: string,
    enrollmentDate: string
}

type CourseObject = {
    courseName: string,
    courseId: string,
    creditAmount: number,
    grade: string,
    enrollmentDate: string
}

type SubGroupObject = {
    subGroupName: string,
    subGroupNameTh: string,
    courses: Array<CourseObject>,
    leastCreditAmount: number,
    sumCreditAmount: number,
    status: boolean
}

type GroupObject = {
    groupName: string,
    groupNameTh: string,
    subGroups: Array<SubGroupObject>,
    leastCreditAmount: number,
    sumCreditAmount: number,
    status: boolean
}

type ReusltTranscriptObject ={
    studentId: string,
    thatName: string,
    englishName: {
        fullname:string,
        lastname:string
    },
    faculty: string,
    result: Array<GroupObject>,
    message: string,
    totalCredit: number,
    notFoundCourses: {
        GroupNameTh: string,
        Course: Array<NotCourseObject>
    },
    isGraduated: boolean,
    gpa: number
}

const getResultTranscript = () =>{
    const storedData = localStorage.getItem("data")
    const result = storedData ? JSON.parse(storedData) : {}
    return result
}

export default function Grade(){
    
    const [data, setData] = useState<ReusltTranscriptObject>()

    useEffect(()=>{
        const getData = getResultTranscript()
        if (getData != null){
            setData(getData)
        }
    }, [])

    return (
        <main>
            {
                data ? 
           <div className="dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-center my-4">ผลลัพท์การตรวจสอบใบรายงานคะแนน</h1>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-3 gap-2">
                <div><span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">ชื่อ</span> : {data.englishName.fullname}</div>
                <div><span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">นามสกุล</span> : {data.englishName.lastname}</div>
                <div><span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">รหัสนิสิต</span> : {data.studentId}</div>
            </div>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-3 gap-x-10 gap-3 justify-between">
                <ResultCreditDashboardComponent title="หมวดวิชาศึกษาทั่วไป" leastCredit={data.result[0].leastCreditAmount} amountCredit={data.result[0].sumCreditAmount} status={data.result[0].status}/>
                <ResultCreditDashboardComponent title="หมวดวิชาเฉพาะ" leastCredit={data.result[1].leastCreditAmount} amountCredit={data.result[1].sumCreditAmount} status={data.result[1].status}/>
                <ResultCreditDashboardComponent title="หมวดวิชาเลือกเสรี" leastCredit={data.result[2].leastCreditAmount} amountCredit={data.result[2].sumCreditAmount} status={data.result[2].status}/>
                <ResultGraduateDashboard status={data.isGraduated}/>
                <ResultGradeDashboardComponent gpa={data.gpa} message={data.message}/>
            </div>
            <hr className="w-4/5 mx-auto my-6 border-black dark:border-white"/>
            {
                data.result.map((result:any)=>(
                    <TableShowGradeComponent key={result.groupName} title={result.groupNameTh} subGroupList={result.subGroups} leastCredit={result.leastCreditAmount} sumCredit={result.sumCreditAmount} status={result.status}/>
                ))
            }
            <SubjectGroupTableBodyComponent subtitle={data.notFoundCourses.GroupNameTh} courses={data.notFoundCourses.Course} status={false}/>
           </div>
           :
           <div></div>
            }

        </main>

    )
}