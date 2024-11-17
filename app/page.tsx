'use client'
import { useState, useRef } from "react";
import { DragDropFileComponent } from "./components/DragDropFileComponent"

export default function Home() {
  const [file, setFile] = useState<string>();

  return (
    <main>
      <DragDropFileComponent />
    </main>
  );
}
