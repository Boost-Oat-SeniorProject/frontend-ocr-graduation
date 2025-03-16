"use server"

export const getEnv = async () =>(
    {
        BACKEND_URL: process.env.BACKEND_URL
    }
)