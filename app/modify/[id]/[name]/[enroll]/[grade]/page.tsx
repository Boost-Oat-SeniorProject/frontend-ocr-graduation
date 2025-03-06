'use client'

import { Card, CardBody, CardFooter, CardHeader, Divider, NumberInput, Select, SelectItem } from "@heroui/react"
import { useParams } from "next/navigation"

const editPath = (path:string) =>{
    return decodeURI(path)
}

const subjectGroups = [
    {key:"1", label: "หมวดวิชาทั่วไป"},
    {key:"2", label: "หมวดวิชาเฉพาะ"},
    {key:"3", label: "หมวดวิชาเสรี"},
]

const subGroups1 = [
    {key:"1", label: "กลุ่มสาระอยู่ดีมีสุข"},
    {key:"2", label: "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"},
    {key:"3", label: "กลุ่มสาระภาษากับการสื่อสาร"},
    {key:"4", label: "กลุ่มสาระพลเมืองไทยและพลเมืองโลก"},
    {key:"5", label: "กลุ่มสาระสุนทรียศาสตร์"},
    {key:"6", label: "เลือกเรียนรายวิชาใน 5 กลุ่มสาระ"},
]

const subGroups2 = [
    {key:"1", label:"วิชาแกน"},
    {key:"2", label:"วิชาเฉพาะบังคับ"},
    {key:"3", label:"เฉพาะเลือก"},
]

export default function ModifyPage(){
    const params = useParams<{id:string, name:string, enroll:string, grade:string}>()

    return (
        <main>
            <Card
                classNames={{
                    base:"max-w-[500px] mx-auto dark:bg-[#003333] bg-[#99FFFF] border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] dark:text-stone-300 text-stone-600",
                    header: "dark:bg-[#033] text-lg bg-lime-400",
                    body: "dark:bg-[#24493C] bg-green-300",
                    footer: "dark:bg-[#033] bg-lime-400"
                }}
            >
                <CardHeader>
                    <span className="font-bold dark:text-white text-black">รหัสวิชา</span> : {params.id}
                </CardHeader>
                <Divider />
                <CardBody>
                    <p><span className="font-bold dark:text-white text-black text-lg">ชื่อวิชา</span>: {editPath(params.name)}</p>
                    <p><span className="font-bold dark:text-white text-black text-lg">ภาคเรียน</span>: {params.enroll}</p>
                    <p><span className="font-bold dark:text-white text-black text-lg">เกรด</span>: {params.grade}</p>
                </CardBody>
                <Divider />
                <CardBody className="grid grid-cols-2 gap-3">
                    <Select
                        label="เลือกหมวดวิชา"
                        classNames={{
                            base: "dark:text-white text-black",
                            trigger:"dark:bg-black",
                            listbox:"dark:bg-black dark:text-white text-black",
                            label:"text-white",
                        }}
                    >
                        <SelectItem>hello</SelectItem>
                    </Select>
                    <Select
                        label="เลือกหมวดวิชา"
                        classNames={{
                            base: "dark:text-white text-black",
                            trigger:"dark:bg-black",
                            listbox:"dark:bg-black dark:text-white text-black",
                            label:"text-white",
                        }}
                    >
                        <SelectItem>hello</SelectItem>
                    </Select>

                    <NumberInput
                        classNames={{
                            label:"dark:text-white text-black",
                            inputWrapper:"dark:text-white text-black dark:bg-black bg-white",
                            input:"dark:text-black text-white text-center",
                            
                        }}
                        label="จำนวนหน่วยกิต"
                        minValue={1}
                        maxValue={4}
                    />
                </CardBody>
                <Divider />
                <CardFooter>
                    
                </CardFooter>
            </Card>                    
        </main>
    )
}