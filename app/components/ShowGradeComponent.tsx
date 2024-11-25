export function ShowGradeComponent(){

    const subjectList = [
        {
            course_id: "01418496",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            grade: "A"
        },
        {
            course_id: "01418496",
            course_name: "Selected Topic",
            course_year: "2560",
            credit: 3,
            grade: "A"
        }
    ]

    return(
        <div className="max-w-[750px] mx-auto min-h-96 dark:bg-[#003333] bg-[#99FFFF]  border-gray-500 border-2 shadow-lg shadow-[#585F54] dark:shadow-[#969696] rounded-2xl">
            { /* Header in UI of extraxt */ }
            <div className="font-bold p-3 text-xl text-center">
              Result Your Transcript
            </div>

            
            {/* Show Student's Transcript Table */}
            <table className="table-auto border-collapse border border-white m-auto bg-gray-300 dark:bg-transparent">
                <thead>
                    <tr className="dark:bg-green-900 bg-green-400">
                        <th className="border border-white px-4 py-2">Course-ID</th>
                        <th className="border border-white px-4 py-2">Course-Name</th>
                        <th className="border border-white px-4 py-2">Course-Year</th>
                        <th className="border border-white px-4 py-2">Credit</th>
                        <th className="border border-white px-4 py-2">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjectList.map((course)=>(
                            <tr>
                                <td className="border border-white text-center font-light">{course.course_id}</td>
                                <td className="border border-white text-center font-light">{course.course_name}</td>
                                <td className="border border-white text-center font-light">{course.course_year}</td>
                                <td className="border border-white text-center font-light">{course.credit}</td>
                                <td className="border border-white text-center font-light">{course.grade}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}