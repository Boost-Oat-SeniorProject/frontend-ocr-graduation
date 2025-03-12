import { Card, CardBody, CardFooter, CardHeader} from "@heroui/react"

export function ResultGradeDashboardComponent({gpa, sumCreditAmount}:{gpa:number, sumCreditAmount:number}){
    return (
        <Card className="dark:bg-lime-600 bg-lime-300 h-58 border-2 dark:border-white border-black">
        <CardHeader className="font-semibold text-sm">
            <h1 className="mx-auto bg-lime-500 px-3 py-1 rounded-full">เกรดเฉลี่ย (GPA)</h1>
        </CardHeader>
        <CardBody>
            <h2 className={`mx-auto text-2xl font-bold`}>{gpa}</h2>
        </CardBody>
        <CardFooter>
            <p className="mx-auto bg-lime-400 rounded-full px-2"><b>หน่วยกิดรวม</b> {sumCreditAmount} <b>หน่วยกิด</b></p>
        </CardFooter>
    </Card>
    )
}