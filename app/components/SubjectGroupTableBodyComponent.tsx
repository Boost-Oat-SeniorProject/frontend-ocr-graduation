import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Tooltip} from "@heroui/react";

type SubjectGroupProps = {
    subtitle?:string,
    subleastcredit?:number,
    subsumcredit?:number,
    courses:Array<object>
}

export function SubjectGroupTableBodyComponent({subtitle="", subleastcredit=0, courses, subsumcredit=0}:SubjectGroupProps){
    
    return (
        <div className="my-10">
           <div className="flex justify-between">
                <h1 className="ml-16 text-lg font-bold">{subtitle ? subtitle : "???"}</h1>
                <p className="mr-16 text-lg font-extralight">{ subsumcredit && subleastcredit ? `จำนวนหน่วยกิตรวม ${subsumcredit} >= ${subleastcredit} หน่วนกิต` : ""}</p>
            </div>
            <Table aria-label="TranscriptTable" classNames={{wrapper:"dark:bg-[#005555] w-5/6 mx-auto", th:"text-stone-400 text-sm dark:text-stone-300 text-center", td:"dark:text-stone-100"}}>
                <TableHeader>
                    <TableColumn>รหัสวิชา</TableColumn>
                    <TableColumn>ชื่อรายวิชา [ภาษาอังกฤษ]</TableColumn>
                    <TableColumn>วิชาบังคับก่อน</TableColumn>
                    <TableColumn>หน่วยกิต</TableColumn>
                    <TableColumn>ภาค/ปีการศึกษา</TableColumn>
                    <TableColumn>เกรด</TableColumn>
                </TableHeader>

                <TableBody emptyContent={"ไม่ม่วิชาในใบรายงานคะแนน"}>
                    {   courses &&
                        courses.map((course:any)=>(
                            <TableRow key={course.courseName}>
                                <TableCell className="text-center">{course.courseId}</TableCell>
                                <TableCell><Tooltip content={course.courseName} placement="top-start" color="success"><p className="truncate">{course.courseName}</p></Tooltip></TableCell>
                                <TableCell className="text-center">{"-"}</TableCell>
                                <TableCell className="text-center">{course.creditAmount}</TableCell>
                                <TableCell className="text-center">{course.enrollmentDate}</TableCell>
                                <TableCell className="text-center">{course.grade}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}