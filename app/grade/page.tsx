'use client'
import { useState, useRef } from "react";
import { ShowGradeComponent } from "../components/ShowGradeComponent";
import { ShowProfileComponent } from "../components/ShowProfileComponent";

export default function Grade(){
    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [studentID, setStudentID] = useState<string>()

    return (
        <main>
            <ShowProfileComponent/>
            <ShowGradeComponent/>
        </main>
    )
}