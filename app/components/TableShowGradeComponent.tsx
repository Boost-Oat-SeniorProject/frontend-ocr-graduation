import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { SubjectGroupTableBodyComponent } from "./SubjectGroupTableBodyComponent";


export function TableShowGradeComponent({title, subGroupList, leastCredit, sumCredit, status}:{title:string, subGroupList:Array<object>, leastCredit:number, sumCredit:number, status:boolean}){
    return (
        <div className="mx-5 my-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">{title ? title : "???"}</h1>
                <p className=" text-lg underline rounded-full">{ leastCredit ? `ไม่น้อยกว่า ${leastCredit} หน่วยกิต` : "?" }</p>
                <p className={`text-lg rounded-full px-2 bg-lime-300 ${status ? "dark:bg-lime-600 bg-lime-300" : "bg-orange-400 dark:bg-orange-600"}`}>{ sumCredit ? `จำนวนหน่วยกิตรวม ${sumCredit} หน่วยกิต` : "?" }</p>
            </div>

            {
                    subGroupList.map((subGroup:any)=>(
                        <SubjectGroupTableBodyComponent subtitle={subGroup.subGroupNameTh} key={subGroup.subGroupName} subleastcredit={subGroup.leastCreditAmount} subsumcredit={subGroup.sumCreditAmount} courses={subGroup.courses} status={subGroup.status}/>
                    ))    
            }
            <hr className="w-5/6 mx-auto border-black dark:border-white border-dashed"/>

        </div>
        
    )
}