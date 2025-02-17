'use client'
import { useState, useRef } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {TableShowGradeComponent} from "../components/TableShowGradeComponent"
import { ResultCreditDashboardComponent } from "../components/ResultCreditDashboardComponent";
import { SubjectGroupTableBodyComponent } from "../components/SubjectGroupTableBodyComponent";
import { ResultGraduateDashboard } from "../components/ResultGraduateDashboard";
export default function Grade(){
    const result = localStorage.getItem("data")
    // localStorage.removeItem("data")
    const data = result ? JSON.parse(result) : null

    return (
        <main>
           <div className="dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-center my-4">ผลลัพท์การตรวจสอบใบรายงานคะแนน</h1>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-3 gap-2">
                <div><span className="font-bold text-lg">ชื่อ</span> : {data.englishName.fullname}</div>
                <div><span className="font-bold text-lg">นามสกุล</span> : {data.englishName.lastname}</div>
                <div><span className="font-bold text-lg">รหัสนิสิต</span> : {data.studentId}</div>
            </div>
            <hr className="w-4/5 mx-auto border-black dark:border-white"/>
            <div className="m-4 grid grid-cols-4 gap-2">
                <ResultCreditDashboardComponent title="หมวดวิชาศึกษาทั่วไป" leastCredit={data.result[0].leastCreditAmount} amountCredit={data.result[0].sumCreditAmount} status={data.result[0].status}/>
                <ResultCreditDashboardComponent title="หมวดวิชาเฉพาะ" leastCredit={data.result[1].leastCreditAmount} amountCredit={data.result[1].sumCreditAmount} status={data.result[0].status}/>
                <ResultCreditDashboardComponent title="หมวดวิชาเลือกเสรี" leastCredit={data.result[2].leastCreditAmount} amountCredit={data.result[2].sumCreditAmount} status={data.result[0].status}/>
                <ResultGraduateDashboard status={data.isGraduated}/>
            </div>
            <hr className="w-4/5 mx-auto my-6 border-black dark:border-white"/>
            {
                data.result.map((result:any)=>(
                    <TableShowGradeComponent key={result.groupName} title={result.groupName} subGroupList={result.subGroups} leastCredit={result.leastCreditAmount} sumCredit={result.sumCreditAmount}/>
                ))
            }
            <SubjectGroupTableBodyComponent subtitle={data.notFoundCourses.GroupName} courses={data.notFoundCourses.courses}/>
           </div>


        </main>
    )
}