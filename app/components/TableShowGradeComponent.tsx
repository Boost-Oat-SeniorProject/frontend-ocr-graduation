import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { SubjectGroupTableBodyComponent } from "./SubjectGroupTableBodyComponent";
import { div } from "framer-motion/client";


export function TableShowGradeComponent({title, subGroupList}:{title:string, subGroupList:Array<string>}){
    
    return (
        <div className="mx-5 my-5">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg">{title}</h1>
                <p className=" text-lg">ไม่น้อยกว่า ? หน่วนกิต</p>
            </div>
            {/* <table className="border-collapse w-full border-2 ">
                <thead>
                    <tr className="border-b-2 border-gray-500 text-sm font-bold">
                        <th className="">รหัสวิชา</th>
                        <th className="">ชื่อรายวิชา [ภาษาอังกฤษ]</th>
                        <th className="">วิชาบังคับก่อน</th>
                        <th className="">หน่วยกิต</th>
                        <th className="">ภาค/ปีการศึกษา</th>
                        <th className="">เกรด</th>
                    </tr>
                </thead>
                {
                    subGroupList.map((subGroup)=><SubjectGroupTableBodyComponent subtitle={subGroup} key={subGroup}/>)    
                }
            </table> */}
            {
                    subGroupList.map((subGroup)=>(
                        <SubjectGroupTableBodyComponent subtitle={subGroup} key={subGroup}/>
                    ))    
            }
            <hr className="w-5/6 mx-auto border-black dark:border-white border-dashed"/>

        </div>
        
    )
}