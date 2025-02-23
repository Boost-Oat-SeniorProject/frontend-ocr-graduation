'use client'

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Custom404() {
  const path = usePathname()
  console.log(path)
    return (
      <main>
        <Card classNames={{
                base: "w-1/2 mx-auto",
                header: "dark:bg-orange-500 bg-orange-400 font-bold",

                }}>
                <CardHeader>Error Page 404</CardHeader>
                <CardBody>เนื่องจากไม่มีเส้นทาง {path} บนเว็บไซต์นี้ กรุณาเข้าหน้าหลักเพื่ออัพโหลดไฟล์ใบรายงานคะแนน</CardBody>
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