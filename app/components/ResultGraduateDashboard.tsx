import { Card, CardBody, CardFooter, CardHeader} from "@heroui/react"

export function ResultGraduateDashboard({status=false, message=""}:{status:boolean, message:string}){
    return (
        <Card className="dark:bg-lime-600 bg-lime-300 h-58 border-2 dark:border-white border-black">
        <CardHeader className="font-semibold text-sm">
            <h1 className="mx-auto bg-lime-500 px-3 py-1 rounded-full">สถานะเรียนตามหลักสูตร</h1>
        </CardHeader>
        <CardBody>
            <h2 className="mx-auto text-2xl font-bold">{status ? "ผ่าน" : "ยังไม่ผ่าน"}</h2>
        </CardBody>
        <CardFooter>
            {
                !status ? 
                <h4 className="text-sm text-center text-orange-800"><span className="font-bold text-lg underline">แจ้งเตือน</span>: {message}</h4>
                :
                <></>
            }
        </CardFooter>
    </Card>
    )
}