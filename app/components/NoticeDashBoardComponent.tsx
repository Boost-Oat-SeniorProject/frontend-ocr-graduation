import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

export default function NoticeDashBoardComponent({numCourse}:{numCourse:number}){
    return (
        <Card className="bg-orange-500 h-58 border-2 dark:border-white border-black">
            <CardHeader className="font-semibold text-sm">
                <h1 className="mx-auto bg-red-500 px-3 py-1 rounded-full">จำนวนวิชาที่ไม่มีในระบบ</h1>
            </CardHeader>
            <CardBody>
                <h2 className={`mx-auto text-2xl font-bold`}>{numCourse} วิชา</h2>
            </CardBody>
            <CardFooter>
                <p className="text-center mx-auto font-semibold">*สามารถเพิ่มวิชาได้โดยการกดปุ่มแก้ไขด้านล่างของหน้าเว็บ</p>
            </CardFooter>
        </Card>
    )
}