export function TableGradeComponent({subjectList}:any){

    return(
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
                    subjectList.map((course:any)=>(
                        <tr key={course.course_id}>
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
    )
}