'use server'

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