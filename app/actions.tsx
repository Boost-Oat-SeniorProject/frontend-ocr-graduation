'use server'

export async function handleUpload(prevState:any, formdata:FormData) {
    const file = formdata.get("file")
    
    try{
        if (file instanceof File && file?.name === 'undefined'){
            throw new Error("กรุณาใส่ไฟล์ใบรายงานคะแนน")
        }

        const result = await fetch(`${process.env.BACKEND_URL}/extract`, {
            method: 'POST',
            body: formdata
        })

        if(!result.ok){
            throw new Error("ไฟล์ดังกล่าวไม่ใช่ใบรายงานคะแนน")
        }

        const data = await result.json()
        
        return {message: "", isNotPass: false, result: data}

    }catch(err:any){
        console.error(err)
        if (err.message === "fetch failed"){
            return {message: "ส่งไฟล์ไม่สำเร็จ", isNotPass: true, result:null}
        }
        return {message: err.message, isNotPass: true, result:null}
    }
}