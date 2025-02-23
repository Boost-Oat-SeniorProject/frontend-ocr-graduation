'use client'

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react"
import Link from "next/link"

export default function ErrorPage({error, reset}:{error:Error & { digest?: string }, reset:()=>void}){
    return (
        <main>
            <Card classNames={{
                base: "w-1/2 mx-auto",
                header: "dark:bg-orange-500 bg-orange-400 font-bold",

                }}>
                <CardHeader>Error Page</CardHeader>
                <CardBody>เนื่องจากคุณยังไม่ได้อัพโหลดไฟล์ใบรายงานคะแนนของคุณ จะไม่สามารถแสดงหน้านี้ได้ กรุณาเข้าหน้าหลักเพื่ออัพโหลดไฟล์ใบรายงานคะแนน</CardBody>
                <CardFooter>
                    <Button
                        color="danger"
                        className="mx-auto"
                        as={Link}
                        href="/"
                    >
                        เข้าหน้าหลัก
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}