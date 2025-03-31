"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Accordion,
    AccordionItem,
  } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function HelpComponent(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
        <Button onPress={onOpen} variant="ghost" className="text-white">คู่มือ</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
            <ModalContent className="bg-[#003333]">
                {(onClose)=>(
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center">วิธีการใช้งาน</ModalHeader>
                        <ModalBody className="mx-10">
                            <Accordion>
                                <AccordionItem key={1} title="การตรวจสอบใบรายงานคะแนนและพิมพ์ใบแบบตรวจสอบ" classNames={{title: "text-white font-bold text-center", trigger:"bg-black rounded-full"}}>
                                    <ul className="list-decimal">
                                        <li>ลากหรือกดพื้นที่สี่เหลี่นมกอบเส้นปะเพื่อ upload ใบรายงานคะแนนจาก<Link className="text-blue-500 hover:underline" href={"https://stdregis.ku.ac.th/"}>เว็บไซต์ระบบสารสนเทศ</Link></li>
                                        <li>ตรวจสอบข้อมูลของนิสิตและรายวิชาที่แสดงผล</li>
                                        <li>เมื่อตรวจสอบแล้วให้กดยืนยันข้อมูลนิสิต</li>
                                        <li>เลื่อนลงด้านล่างสุดและกดพิมพ์ใบแบบตรวจสอบหลักสูตร</li>
                                        <video width={500} height={240} autoPlay className="mx-auto my-2" loop>
                                            <source src="/HowToUseVerify.mp4"/>
                                        </video>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem key={2} title="กรณีที่มีรายวิชาที่ไม่มีในระบบ" classNames={{title: "text-white font-bold text-center", trigger:"bg-black rounded-full"}}>
                                    <ul className="list-decimal">
                                        <li>ทำการเลื่อนด้านล่างสุดและกดแก้ไขที่แสดงวิชานั้น ๆ</li>
                                        <li>เลือกหมวดวิชาและหมวดวิชาย่อย</li>
                                        <li>กดเพิ่มรายวิชาเพื่อ Update ข้อมูลรายวิชา</li>
                                        <Image src={"/edit1.png"} width={400} height={400} alt="edit 1" className="my-2 mx-auto border-4 border-black"/>
                                        <Image src={"/edit2.png"} width={400} height={400} alt="edit 2" className="my-2 mx-auto border-4 border-black"/>
                                    </ul>
                                </AccordionItem>
                            </Accordion>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose} variant="light" className="text-white">ปิด</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}