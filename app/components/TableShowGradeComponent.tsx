import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { SubjectGroupTableBodyComponent } from "./SubjectGroupTableBodyComponent";
import { div } from "framer-motion/client";


export function TableShowGradeComponent({title, subGroupList, credit}:{title:string, subGroupList:Array<object>, credit:number}){
    return (
        <div className="mx-5 my-5">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg">{title ? title : "???"}</h1>
                <p className=" text-lg">ไม่น้อยกว่า { credit ? `${credit}` : "?" } หน่วนกิต</p>
            </div>

            {
                    subGroupList.map((subGroup:any)=>(
                        <SubjectGroupTableBodyComponent subtitle={subGroup.subGroupName} key={subGroup.subGroupName} subcredit={subGroup.leastCreditAmount} courses={subGroup.courses}/>
                    ))    
            }
            <hr className="w-5/6 mx-auto border-black dark:border-white border-dashed"/>

        </div>
        
    )
}