'use client'

import { Card, CardBody, CardFooter, CardHeader, Divider, NumberInput, Select, SelectItem, Button, Alert, Progress } from "@heroui/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const editPath = (path:string) =>{
    return decodeURI(path)
}

const subjectGroups = [
    {key:"1", label: "หมวดวิชาทั่วไป"},
    {key:"2", label: "หมวดวิชาเฉพาะ"},
    {key:"3", label: "หมวดวิชาเสรี"},
]

const generalGroups = [
    {key:"1", label: "กลุ่มสาระอยู่ดีมีสุข"},
    {key:"2", label: "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"},
    {key:"3", label: "กลุ่มสาระภาษากับการสื่อสาร"},
    {key:"4", label: "กลุ่มสาระพลเมืองไทยและพลเมืองโลก"},
    {key:"5", label: "กลุ่มสาระสุนทรียศาสตร์"},
    {key:"6", label: "เลือกเรียนรายวิชาใน 5 กลุ่มสาระ"},
]

const majorGroups = [
    {key:"1", label:"วิชาแกน"},
    {key:"2", label:"วิชาเฉพาะบังคับ"},
    {key:"3", label:"เฉพาะเลือก"},
]

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
        Course: Array<CourseObject>
    },
    isGraduated: boolean,
    gpa: number
}

export default function ModifyPage(){
    const params = useParams<{id:string, name:string, enroll:string, grade:string, creditAmount:string}>()

    const [groupName, setGroupName] = useState<string>()
    const [subgroupName, setSubgroupName] = useState<string>()
    const [pending, setPending] = useState<boolean>(false)
    const [isErrorAlert, setIsErrorAlert] = useState<boolean>(false)
    const [textAlert, setTextAlert] = useState<string>()
    const router = useRouter()

    const handleSelectionChangeGroup = async (e:any) =>{
        setGroupName(e.target.value)
    }

    const handleSelectionChangeSubGroup = (e:any) =>{
        setSubgroupName(e.target.value)
    }

    const noticeAlert = (text:string) =>{
        setIsErrorAlert(true)
        setTextAlert(text)
        setTimeout(() => {
            setIsErrorAlert(false)
            setTextAlert("")
          }, 3000);
    }

    const handleAddSubject = () =>{
        setPending(true)
        try{
            if (!groupName){
                throw new Error("กรุณาเลือกหมวดวิชา")
            }
            else if((groupName==="1" || groupName==="2") && !subgroupName){
                throw new Error("กรุณาเลือกหมวดวิชาย่อย")
            }

            const newCourse:CourseObject = {
                courseName: editPath(params.name),
                courseId: params.id,
                creditAmount: Number(params.creditAmount),
                grade: params.grade.replace("%2B", "+"),
                enrollmentDate: params.enroll.replace("_", "/")
            }

            // get data from localStorange
            const storedData = localStorage.getItem("data")
            const transcript:ReusltTranscriptObject= storedData ? JSON.parse(storedData) : {}

            // append subject in array
            let subGroup = null
            if (groupName==="1"){
                subGroup = transcript.result[0].subGroups[Number(subgroupName)-1]
            }else if(groupName==="2"){
                subGroup = transcript.result[1].subGroups[Number(subgroupName)-1]
            }else if(groupName==="3"){
                subGroup = transcript.result[2].subGroups[0]
            }else{
                throw new Error("ไม่มีหมวดวิชาดังกล่าว")
            }

            subGroup.courses.push(newCourse)

            // Plus credit value in group and subgroup
            subGroup.sumCreditAmount += newCourse.creditAmount
            if (subGroup.leastCreditAmount <= subGroup.sumCreditAmount){
                subGroup.status = true
            }

            transcript.result[Number(groupName)-1].sumCreditAmount += newCourse.creditAmount
            if (transcript.result[Number(groupName)-1].sumCreditAmount >= transcript.result[Number(groupName)-1].leastCreditAmount){
                transcript.result[Number(groupName)-1].status = true
            }

            if(transcript.result[0].status && transcript.result[1].status && transcript.result[2].status){
                transcript.isGraduated = true
            }

            // remove subject in notFoundCourses array
            transcript.notFoundCourses.Course = transcript.notFoundCourses.Course.filter(course=>course.courseId!==newCourse.courseId && course.courseName!==newCourse.courseName)

            localStorage.setItem("data", JSON.stringify(transcript))
            router.push("/grade")

            
        }catch(error:any){
            noticeAlert(error.message)
        }

        
        setPending(false)
    }

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
            <Card
                classNames={{
                    base:"max-w-[600px] mx-auto dark:bg-[#003333] bg-[#99FFFF] border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] dark:text-stone-300 text-stone-600",
                    header: "dark:bg-[#033] text-lg bg-lime-400",
                    body: "dark:bg-[#24493C] bg-green-300",
                    footer: "dark:bg-[#033] bg-white"
                }}
            >
                <CardHeader>
                    <span className="font-bold dark:text-white text-black">รหัสวิชา</span> : {params.id}
                </CardHeader>
                <Divider />
                <CardBody>
                    <p><span className="font-bold dark:text-white text-black text-lg">ชื่อวิชา</span>: {editPath(params.name)}</p>
                    <p><span className="font-bold dark:text-white text-black text-lg">ภาคเรียน</span>: {params.enroll}</p>
                    <p><span className="font-bold dark:text-white text-black text-lg">หน่วยกิต</span>: {params.creditAmount}</p>
                    <p><span className="font-bold dark:text-white text-black text-lg">เกรด</span>: {params.grade.replace("%2B", "+")}</p>
                </CardBody>
                <Divider />
                <CardBody className="grid grid-cols-2 gap-3">
                    <Select
                        label="เลือกหมวดวิชา"
                        isRequired
                        classNames={{
                            trigger:"dark:bg-gray-400",
                            listbox:"dark:bg-gray-400 text-black",
                            label:"text-black",
                            errorMessage:"bg-orange-600 text-white text-center rounded-full"
                        }}
                        selectedKeys={groupName}
                        onChange={handleSelectionChangeGroup}
                    >
                        {
                            subjectGroups.map((subjectGroup)=>(
                                <SelectItem key={subjectGroup.key}>{subjectGroup.label}</SelectItem>
                            ))
                        }
                    </Select>
                    <Select
                        label="เลือกหมวดวิชาย่อย"
                        isRequired
                        classNames={{
                            trigger:"dark:bg-gray-400",
                            listbox:"dark:bg-gray-400 text-black",
                            label:"text-black",
                            errorMessage:"bg-orange-600 text-white text-center rounded-full"
                        }}
                        selectedKeys={subgroupName}
                        onChange={handleSelectionChangeSubGroup}
                        isDisabled={groupName==="3" || groupName===undefined}
                    >
                        {
                            groupName==="1" ?
                                generalGroups.map((subGroup)=>(
                                    <SelectItem key={subGroup.key}>{subGroup.label}</SelectItem>
                                ))
                            : groupName==="2" ?
                                majorGroups.map((subGroup)=>(
                                    <SelectItem key={subGroup.key}>{subGroup.label}</SelectItem>
                                ))
                            :
                            <SelectItem></SelectItem>
                        }
                    </Select>

                </CardBody>
                <Divider />
                <CardFooter>
                    <Button className="mx-auto" color="success" onPress={handleAddSubject}>เพิ่มรายวิชา</Button>
                </CardFooter>
            </Card>                    
        </main>
    )
}