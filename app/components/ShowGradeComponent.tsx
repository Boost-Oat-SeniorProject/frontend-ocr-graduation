import { Tab, Tabs } from "@nextui-org/tabs"
import { TableGradeComponent } from "./TableGradeComponent"

export function ShowGradeComponent(){

    const subjectList = [
        {
            course_id: "01418496",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        },
        {
            course_id: "01418497",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        }
    ]

    const subjectList1 = [
        {
            course_id: "01418316",
            course_name: "Software Engineer",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        },
        {
            course_id: "01418497",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        }
    ]

    const subjectList2 = [
        {
            course_id: "01418123",
            course_name: "Computing Scienece 123456789123456789123456789",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        },
        {
            course_id: "01418497",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            semeter: `2/2564`,
            grade: "A"
        }
    ]

    return(
        <div className="max-w-[750px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl">
            { /* Header in UI of extraxt */ }
            <div className="font-bold p-3 text-xl text-center">
              ผลลัพท์การตรวจสอบใบรายงานคะแนน
            </div>

            <div className="text-center">
                <Tabs aria-label="Tabs colors" color="success">
                    <Tab title="หมวดวิชาศึกษาทั่วไป">
                        <TableGradeComponent subjectList={subjectList}/>
                    </Tab>
                    <Tab title="หมวดวิชาเฉพาะ">
                        <TableGradeComponent subjectList={subjectList1}/>
                    </Tab>
                    <Tab title="หมวดวิชาเสรี">
                        <TableGradeComponent subjectList={subjectList2}/>
                    </Tab>
                </Tabs>
            </div>
            <br/>
            
        </div>
    )
}