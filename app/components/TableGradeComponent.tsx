import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

export function TableGradeComponent({subjectList}:{subjectList:Array<{course_id:string, course_name:string, course_year:string, credit:number, grade:string}>}){

    return (
        <Table aria-label="Example static collection table" className="text-black">
            <TableHeader>
                <TableColumn className="text-center bg-green-500"><span className="text-black">รหัสวิชา</span></TableColumn>
                <TableColumn className="text-center bg-green-400"><span className="text-black">ชื่อวิชา</span></TableColumn>
                <TableColumn className="text-center bg-green-300"><span className="text-black">ปีหลักสูตร</span></TableColumn>
                <TableColumn className="text-center bg-green-200"><span className="text-black">หน่วยกิจ</span></TableColumn>
                <TableColumn className="text-center bg-green-100"><span className="text-black">เกรด</span></TableColumn>
            </TableHeader>
            <TableBody emptyContent={"ไม่มีรายวิชาในระบบ"} items={subjectList}>
                {(course)=>(
                    <TableRow key={course.course_id}>
                        <TableCell className="text-center">{course.course_id}</TableCell>
                        <TableCell className="text-center">{course.course_name}</TableCell>
                        <TableCell className="text-center">{course.course_year}</TableCell>
                        <TableCell className="text-center">{course.credit}</TableCell>
                        <TableCell className="text-center">{course.grade}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}