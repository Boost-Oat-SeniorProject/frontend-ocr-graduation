import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Tooltip} from "@heroui/react";
export function SubjectGroupTableBodyComponent({subtitle}:{subtitle:string}){
    return (
        <div className="my-5">
           <div className="flex justify-between">
                <h1 className="ml-16 text-lg">{subtitle}</h1>
                <p className="mr-16 text-lg ">ไม่น้อยกว่า ? หน่วนกิต</p>
            </div>
            <Table aria-label="TranscriptTable" classNames={{wrapper:"dark:bg-[#005555] w-4/5 mx-auto", th:"text-stone-400 text-sm dark:text-stone-300", td:"dark:text-stone-100"}}>
                <TableHeader>
                    <TableColumn>รหัสวิชา</TableColumn>
                    <TableColumn>ชื่อรายวิชา [ภาษาอังกฤษ]</TableColumn>
                    <TableColumn>วิชาบังคับก่อน</TableColumn>
                    <TableColumn>หน่วยกิต</TableColumn>
                    <TableColumn>ภาค/ปีการศึกษา</TableColumn>
                    <TableColumn>เกรด</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"ไม่ม่วิชาในตารางนี้"}>
                    <TableRow key={1}>
                        <TableCell>6410451423</TableCell>
                        <TableCell><Tooltip content={"asmkakwnvoianwionvoiwna"} placement="top-start" className="bg-green-500">asmkakwnvoianwionvoiwna</Tooltip></TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key={2}>
                        <TableCell>Siwakorn</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}