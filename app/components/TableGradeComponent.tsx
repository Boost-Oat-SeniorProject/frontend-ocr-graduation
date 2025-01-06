import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/table";

export function TableGradeComponent({subjectList}:{subjectList:Array<{course_id:string, course_name:string, course_year:string, credit:number, grade:string}>}){

    const columns = [
        {
            key: "course_id",
            label: "รหัสวิชา"
        },
        {
            key: "course_name",
            label: "ชื่อวิชา"
        },
        {
            key: "course_year",
            label: "ปีหลักสูตร"
        },
        {
            key: "credit",
            label: "หน่วยกิต"
        },
        {
            key: "semeter",
            label: `ภาค/ปีการศึกษา`
        },
        {
            key: "grade",
            label: "เกรด"
        },
    ]

    return (
        <Table aria-label="Grade Table" classNames={{wrapper:"bg-black/25"}}>
            <TableHeader columns={columns}>
                {(column)=><TableColumn key={column.key} className="text-black bg-green-500 text-sm ">{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"ไม่มีรายวิชาในระบบ"} items={subjectList}>
                {(course)=>(
                    <TableRow key={course.course_id}>
                        {(columnKey)=><TableCell>{getKeyValue(course, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}