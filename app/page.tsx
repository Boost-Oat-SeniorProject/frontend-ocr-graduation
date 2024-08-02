'use client'
import { useState, useRef } from "react";
import { DragDropFileComponent } from "./components/DragDropFileComponent"

export default function Home() {
  const [file, setFile] = useState<string>();

  return (
    <main>
      <div className="text-center text-2xl p-5 font-bold">
        เว็บไซต์ตรวจสอบใบจบการศึกษา ณ มหาวิทยาลัยเกษตรศาสตร์ บางเขน
      </div>

      <DragDropFileComponent />

    </main>
  );
}
