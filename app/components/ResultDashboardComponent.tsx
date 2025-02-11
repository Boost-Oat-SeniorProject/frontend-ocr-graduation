import { Card, CardBody, CardFooter, CardHeader, CircularProgress } from "@heroui/react"
export function ResultDashboardComponent({title, leastCredit, amountCredit, status}:{title:string, leastCredit:number, amountCredit: number, status:boolean}){
    return(
        <Card className="dark:bg-lime-600 bg-lime-300 h-58">
            <CardHeader className="font-semibold text-lg">
                <h1 className="mx-auto bg-lime-500 px-3 py-1 rounded-full">{title}</h1>
            </CardHeader>
            <CardBody>
                {/* <CircularProgress
                    classNames={{
                        svg: "w-24 h-24 drop-shadow-md",
                        indicator: "stroke-white",
                        track: "stroke-white/20",
                        value: "text-xl font-semibold",
                        base: "mx-auto"
                    }}
                    value={amountCredit}
                    maxValue={leastCredit}
                    formatOptions={{style:"decimal"}}
                    aria-valuemax={leastCredit}
                /> */}
                <h2 className="mx-auto text-3xl font-bold">{status ? "ผ่าน" : "ไม่ผ่าน"}</h2>
            </CardBody>
            <CardFooter>
                <h4 className="mx-auto"><span className="underline">{amountCredit}</span> <span>&#8804;</span> {leastCredit} <span className="font-semibold">หน่วยกิต</span></h4>
            </CardFooter>
        </Card>
    )
}