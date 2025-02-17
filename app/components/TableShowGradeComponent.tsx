import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { SubjectGroupTableBodyComponent } from "./SubjectGroupTableBodyComponent";
import { div } from "framer-motion/client";


export function TableShowGradeComponent({title, subGroupList, leastCredit, sumCredit}:{title:string, subGroupList:Array<object>, leastCredit:number, sumCredit:number}){
    return (
        <div className="mx-5 my-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">{title ? title : "???"}</h1>
                <p className=" text-lg dark:bg-lime-600 rounded-full px-2 bg-lime-300">{ leastCredit ? `ไม่น้อยกว่า ${leastCredit} หน่วนกิต` : "?" }</p>
                <p className=" text-lg dark:bg-lime-600 rounded-full px-2 bg-lime-300">{ sumCredit ? `จำนวนหน่วยกิตรวม ${sumCredit} หน่วนกิต` : "?" }</p>
            </div>

            {
                    subGroupList.map((subGroup:any)=>(
                        <SubjectGroupTableBodyComponent subtitle={subGroup.subGroupName} key={subGroup.subGroupName} subleastcredit={subGroup.leastCreditAmount} subsumcredit={subGroup.sumCreditAmount} courses={subGroup.courses}/>
                    ))    
            }
            <hr className="w-5/6 mx-auto border-black dark:border-white border-dashed"/>

        </div>
        
    )
}