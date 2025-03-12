'use client'
import { useState, useEffect, useRef } from "react";
import {TableShowGradeComponent} from "../components/TableShowGradeComponent"
import { ResultCreditDashboardComponent } from "../components/ResultCreditDashboardComponent";
import { ResultGraduateDashboard } from "../components/ResultGraduateDashboard";
import { ResultGradeDashboardComponent } from "../components/ResultGradeDashboardComponent";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, addToast, Progress, Switch, } from "@heroui/react";
import { Alert } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoticeDashBoardComponent from "../components/NoticeDashBoardComponent";

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
    thaiName: string,
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
        Course: Array<CourseObject>
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
    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [pending, setPending] = useState(false)
    const [textAlert, setTextAlert] = useState("")
    const rounter = useRouter()
    const errorRef = useRef<HTMLDivElement>(null)

    const handlePrint = async () => {
        setPending(true)

        try{
            if(!isAccepted){
                errorRef.current?.scrollIntoView({behavior: "smooth", block: "center"})
                throw new Error("ยังไม่ได้กดปุ่มยืนยันข้อมูลนิสิต")
            }
            const packet = {
                thaiName: `${firstname} ${lastname}`,
                studentId: studentId,
                gpa: data?.gpa,
                totalCredit: data?.totalCredit,
                result: data?.result
            }
    
            console.log(packet)

            const respone = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/to_pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packet),
            })

            if(!respone.ok){
                throw new Error(`Respone status : ${respone.status}`)
            }

            const blob = await respone.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a");
            a.href = url;
            a.download = `ใบตรวจสอบหลักสูตร_${studentId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            addToast({
                title: "พิมพ์ใบรายงานคะแนนสำเร็จ",
                color: "success",
                timeout: 5000,
                variant: 'solid'
            })
            rounter.push("/")

            console.log("Pass")

        }catch(error:any){
            noticeAlert(error.message)
        }

        setPending(false)
    }

    const noticeAlert = (text:string) =>{
        setIsErrorAlert(true)
        setTextAlert(text)
        setTimeout(() => {
            setIsErrorAlert(false)
            setTextAlert("")
          }, 3000);
    }

    useEffect(()=>{
        const getResultTranscript = async () => {
            const storedData = localStorage.getItem("data")
            const result = storedData ? JSON.parse(storedData) : {}
            console.log(result)
            if (result != null){
                setData(result)
            }
        }

        getResultTranscript()
    }, [])

    useEffect(()=>{
        const setResultTranscript = async () => {
            if(data != null){
                setFirstname(data.thaiName.split(" ")[0])
                setLastname(data.thaiName.split(" ")[1] || "")
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
            <AnimatePresence>
                {
                    isErrorAlert &&
                    <motion.div className="fixed top-14 w-full z-20" initial={{opacity: 0, y: 0, }} animate={{opacity:1, y: 10}} exit={{opacity:0, y:0}} transition={{duration:0.3, ease:"linear"}}>
                        <Alert description={textAlert} title={"แจ้งเตือน"} variant={'solid'} color="warning" classNames={{title: "motion-safe:animate-bounce font-bold", base:"w-1/2 relative left-1/2 -translate-x-1/2"}}/>
                    </motion.div>
                }
    
                {
                    pending &&
                    <motion.div className="fixed top-0 w-full h-full bg-black/50 z-50" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <Progress isIndeterminate size="lg" className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2" label="Loading..." classNames={{track:"bg-green-500"}}/>
                    </motion.div>
                }
            </AnimatePresence>
            {
                data ? 
           <div className="dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-center my-4">ผลลัพท์การตรวจสอบใบรายงานคะแนน</h1>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="my-8 grid grid-cols-4 gap-2">
                <div className="h-12 text-center">
                    <span className="font-bold text-lg rounded-full p-1">ชื่อ</span> : <input value={firstname} disabled={isAccepted} className="text-black w-36 rounded-lg px-3" onChange={e => setFirstname(e.target.value)}/>
                    <div className="text-orange-400">{notice1}</div>
                </div>
                <div className="h-12 text-center">
                    <span className="font-bold text-lg rounded-full p-1">นามสกุล</span> : <input value={lastname} disabled={isAccepted} className="text-black w-36 rounded-lg px-3" onChange={e => setLastname(e.target.value)}/>
                    <div className="text-orange-400">{notice2}</div>
                </div>
                <div className="h-12 text-center">
                    <span className="font-bold text-lg rounded-full p-1">รหัสนิสิต</span> : <input value={studentId} disabled={isAccepted} className="text-black w-32 rounded-lg px-3" onChange={e => setStudentId(e.target.value)}/>
                    <div className="text-orange-400">{notice3}</div>
                </div>
                <div className="h-12 text-center" ref={errorRef}>
                    <Switch 
                        isDisabled={notice1==="" && notice2==="" && notice3==="" ? false: true}
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
                <ResultGradeDashboardComponent gpa={data.gpa} sumCreditAmount={data.totalCredit}/>
                {
                    data.notFoundCourses.Course.length ?
                    <NoticeDashBoardComponent numCourse={data.notFoundCourses.Course.length}/>
                    : <></>
                }
            </div>
            <hr className="w-4/5 mx-auto my-6 border-black dark:border-white"/>
            {
                data.result.map((result:any)=>(
                    <TableShowGradeComponent key={result.groupName} title={result.groupNameTh} subGroupList={result.subGroups} leastCredit={result.leastCreditAmount} sumCredit={result.sumCreditAmount} status={result.status}/>
                ))
            }
            {/* <SubjectGroupTableBodyComponent subtitle={data.notFoundCourses.GroupNameTh} courses={data.notFoundCourses.Course} status={false}/> */}
            

            {/* Subjects which doesn't exist in database */}
            {
                data.notFoundCourses.Course.length > 0 &&
                <div className="">
                    <h4 className="px-5 text-lg font-bold">วิชาที่ไม่มีในระบบ</h4>
                    <div className="grid grid-cols-3">
                        {
                            data.notFoundCourses.Course.map((course:CourseObject)=>(
                                <Card
                                    key={course.courseId}
                                    classNames={{
                                        base:"text-sm dark:text-stone-300 text-stone-600 mx-4 my-5 border-4 border-gray-500",
                                        header: "dark:bg-[#033] text-lg bg-lime-400",
                                        body: "dark:bg-[#24493C] bg-green-300",
                                        footer: "dark:bg-[#033] bg-lime-400"
                                    }}
                                >
                                    <CardHeader>
                                        <span className="font-bold dark:text-white text-black">รหัสวิชา</span> : {course.courseId}
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p><span className="font-bold dark:text-white text-black text-lg">ชื่อวิชา</span>: {course.courseName}</p>
                                        <p><span className="font-bold dark:text-white text-black text-lg">ภาคเรียน</span>: {course.enrollmentDate}</p>
                                        <p><span className="font-bold dark:text-white text-black text-lg">หน่วนกิต</span>: {course.creditAmount}</p>
                                        <p><span className="font-bold dark:text-white text-black text-lg">เกรด</span>: {course.grade}</p>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <Link href={`/modify/${course.courseId}/${course.courseName}/${course.enrollmentDate.replace("/","_")}/${course.grade}/${course.creditAmount}`} className="bg-green-600 text-white px-6 py-2 rounded-full mx-auto hover:bg-white hover:text-black">แก้ไข</Link>
                                    </CardFooter>
                                </Card>
                            ))    
                        }
                    </div>
                </div>
            }

            <div className="text-center p-6">
                <Button onPress={handlePrint} className="bg-green-600 text-white">พิมพ์ใบรายงานคะแนน</Button>
            </div>
           </div>
           :
           <div>Loading...</div>
            }

        </main>

    )
}