'use server'

type Infor = {
    oldInfor: {
        firstname: string,
        lastname: string,
        studentId: string
    },

    newInfor: {
        firstname: string,
        lastname: string,
        studentId: string
    }
}

export async function fetch_pdf(url:string, method:string, body:string){

    try{
        const response = await fetch(url,{
            method:method,
            headers:{
                "Content-Type": "application/json"
            },
            body:body
        })
        if(!response.ok){
            throw new Error("Not Pass")
        }
        const data = await response.blob()
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}

export async function updateInfor(body:Infor){
    if(JSON.stringify(body.oldInfor) ===JSON.stringify(body.newInfor)){
        return {
            status: false,
            message: "ข้อมูลนิสิตไม่มีการเปลี่ยนแปลง"
        }
    }else{
        return {
            status: true,
            message: "แก้ไขข้อมูลนิสิตสำเร็จ"
        }
    }
}