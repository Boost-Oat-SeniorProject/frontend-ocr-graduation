'use client'
import { useState, useRef, useEffect } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {TableShowGradeComponent} from "../components/TableShowGradeComponent"
import { ResultCreditDashboardComponent } from "../components/ResultCreditDashboardComponent";
import { SubjectGroupTableBodyComponent } from "../components/SubjectGroupTableBodyComponent";
import { ResultGraduateDashboard } from "../components/ResultGraduateDashboard";
import { ResultGradeDashboardComponent } from "../components/ResultGradeDashboardComponent";
import { div } from "framer-motion/client";
import { Button, Switch } from "@heroui/react";

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

export default function Grade(){
    
    const [data, setData] = useState<ReusltTranscriptObject>()

    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [studentId, setStudentId] = useState<string>("")
    const [notice1, setNotice1] = useState("")
    const [notice2, setNotice2] = useState("")
    const [notice3, setNotice3] = useState("")
    const [isAccepted, setIsAccepted] = useState(false)

    useEffect(()=>{
        const getResultTranscript = async () => {
            const storedData = localStorage.getItem("data")
            const result = storedData ? JSON.parse(storedData) : {}
            if (result != null){
                setData(result)
            }
        }

        getResultTranscript()
    }, [])

    useEffect(()=>{
        const setResultTranscript = async () => {
            if(data != null){
                setFirstname(data.englishName.fullname)
                setLastname(data.englishName.lastname)
                setStudentId(data.studentId)
            }
        }

        setResultTranscript()
    }, [data])

    useEffect(()=>{
        if (!firstname.match(/[\u0E00-\u0E7F' ]/)){
            setNotice1("*กรุณาเขียนขื่อภาษาไทย")
        }else{
            setNotice1("")
        }

        if (!lastname.match(/[\u0E00-\u0E7F' ]/)){
            setNotice2("*กรุณาเขียนนามสกุลภาษาไทย")
        }else{
            setNotice2("")
        }

        if (!studentId.match(/[^\u0E00-\u0E7Fa-zA-Z' ]|^'|'$|''*/)){
            setNotice3("*กรุณาเขียนรหัสนิสิต")
        }else{
            setNotice3("")
        }
    }, [firstname, lastname, studentId])

    return (
        <main>
            {
                data ? 
           <div className="dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-center my-4">ผลลัพท์การตรวจสอบใบรายงานคะแนน</h1>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-4 gap-2">
                <div className="h-12 text-center">
                    <span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">ชื่อ</span> : <input value={firstname} className="text-black w-32 rounded-lg" onChange={e => setFirstname(e.target.value)}/>
                    <div className="text-orange-400">{notice1}</div>
                </div>
                <div className="h-12 text-center">
                    <span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">นามสกุล</span> : <input value={lastname} className="text-black w-32 rounded-lg" onChange={e => setLastname(e.target.value)}/>
                    <div className="text-orange-400">{notice2}</div>
                </div>
                <div className="h-12 text-center">
                    <span className="font-bold text-lg bg-lime-200 dark:bg-lime-600 rounded-full p-1">รหัสนิสิต</span> : <input value={studentId} className="text-black w-32 rounded-lg" onChange={e => setStudentId(e.target.value)}/>
                    <div className="text-orange-400">{notice3}</div>
                </div>
                <div className="h-12 text-center">
                    <Switch 
                        isSelected={isAccepted}
                        onValueChange={setIsAccepted}
                        color="success"
                        classNames={{label: "dark:text-white text-black", wrapper:"bg-gray-400"}}
                    >
                        ยืนยันข้อมูลนิสิต
                    </Switch>
                </div>
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
            <hr className="w-4/5 mx-auto my-6 border-black dark:border-white"/>
            <div>
                <Button>พิมพ์ใบรายงานคะแนน</Button>
            </div>
           </div>
           :
           <div></div>
            }

        </main>

    )
}