import { Card, CardBody, CardFooter, CardHeader} from "@heroui/react"

export function ResultGraduateDashboard({status=false}:{status:boolean}){
    return (
        <Card className="dark:bg-lime-600 bg-lime-300 h-58 border-2 dark:border-white border-black">
        <CardHeader className="font-semibold text-sm">
            <h1 className="mx-auto bg-lime-500 px-3 py-1 rounded-full">สถานะเรียนตามหลักสูตร</h1>
        </CardHeader>
        <CardBody>
            <h2 className="mx-auto text-2xl font-bold">{status ? "ผ่าน" : "ยังไม่ผ่าน"}</h2>
        </CardBody>
        <CardFooter>
            <h4 className="mx-auto text-sm"><span className="font-bold">ผ่าน</span> : เรียนครบหลักสูตร</h4>
            <h4 className="mx-auto text-sm"><span className="font-bold">ไม่ผ่าน</span> : ยังเรียนไม่ครบหลักสูตร</h4>
        </CardFooter>
    </Card>
    )
}