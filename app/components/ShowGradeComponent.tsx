export function ShowGradeComponent(){
    return(
        <div className="max-w-[700px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl">
            { /* Header in UI of extraxt */ }
            <div className="font-bold p-3 text-xl text-center">
              Result Your Transcript
            </div>

            <table className="table-auto border-collapse border border-white">
                <thead>
                    <tr className="bg-black">
                        <th className="border border-white px-4 py-2">Course-ID</th>
                        <th className="border border-white px-4 py-2">Course-Name</th>
                        <th className="border border-white px-4 py-2">Credit</th>
                        <th className="border border-white px-4 py-2">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-white text-center">01418496</td>
                        <td className="border border-white text-center">Selected Topic</td>
                        <td className="border border-white text-center">3</td>
                        <td className="border border-white text-center">A</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}