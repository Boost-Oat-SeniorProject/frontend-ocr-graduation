import { Card, CardBody, CardFooter, CardHeader, CircularProgress } from "@heroui/react"
export function ResultCreditDashboardComponent({title, leastCredit, amountCredit, status}:{title:string, leastCredit:number, amountCredit: number, status:boolean}){
    return(
        <Card className="dark:bg-lime-600 bg-lime-300 h-58 border-2 dark:border-white border-black">
            <CardHeader className="font-semibold text-sm">
                <h1 className="mx-auto bg-lime-500 px-3 py-1 rounded-full">{title}</h1>
            </CardHeader>
            <CardBody>
                <h2 className="mx-auto text-2xl font-bold">{status ? "ผ่าน" : "ไม่ผ่าน"}</h2>
            </CardBody>
            <CardFooter>
                <h4 className="mx-auto"><span className="underline">{amountCredit}</span> <span>&#8804;</span> {leastCredit} <span className="font-semibold">หน่วยกิต</span></h4>
            </CardFooter>
        </Card>
    )
}