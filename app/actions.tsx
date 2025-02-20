'use server'

export async function handleUpload(prevState:any, formdata:FormData) {
    const file = formdata.get("file")
    
    try{
        if (file?.name === 'undefined'){
            throw new Error("กรุณาใส่ไฟล์ใบรายงานคะแนน")
        }

        const result = await fetch(`${process.env.BACKEND_URL}/extract`, {
            method: 'POST',
            body: formdata
        })

        const data = await result.json()
        
        return {message: "", isNotPass: false, result: data}

    }catch(err:any){
        if (err.message === "fetch failed"){
            return {message: "ส่งไฟล์ไม่สำเร็จ", isNotPass: true, result:null}
        }
        console.log(err)
        return {message: err.message, isNotPass: true, result:null}
    }
}