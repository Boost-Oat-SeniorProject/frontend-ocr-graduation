'use client'

export default function Home() {

  return (
    <main>
      <div className="text-center text-2xl p-5 font-bold">
        เว็บไซต์ตรวจสอบใบจบการศึกษา ณ มหาวิทยาลัยเกษตรศาสตร์ บางเขน
      </div>

      <div className="w-[500px] min-h-96 dark:bg-[#003333] bg-[#99FFFF] m-auto border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl">
        <div className="font-bold border-white border-2 p-3">
          Add Transcript Files
        </div>

        <input type="file" className="border-white border-2 w-full h-40"/>
      </div>
    </main>
  );
}
