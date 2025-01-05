export function ShowProfileComponent(){
    return (
        <div className="max-w-[750px] mx-auto dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl">
            { /* Header in UI of profile */ }
            <div className="font-bold p-3 text-xl text-center">
              ข้อมูลของนิสิต
            </div>

            {/* Show Student's Profile */}
            <form className="mx-auto w-5/6 grid grid-rows-3 grid-cols-2 justify-stretch gap-4">
                <div className="flex flex-row justify-between items-center">
                    <label>ชื่อ</label>
                    <input className="p-1" placeholder="Firstname"/>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <label>นามสกุล</label>
                    <input className="p-1" placeholder="Lastname"/>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <label>รหัสนิสิต</label>
                    <input className="p-1" placeholder="Student ID"/>
                </div>
                
                <div className="flex flex-row justify-between items-center border-2 border-transparent hover:border-green-300">
                    <input type="checkbox" className="w-6 h-6 mx-2 accent-green-400"/>
                    <label className="text-sm">คุณยืนยันข้อมูลนิสิคเพื่อทำใบตรวจสอบหลักสูตร</label>
                </div>
            </form>
        </div>
    )
}