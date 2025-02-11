'use client'
export default function ErrorPage({error, reset}:{error:Error & { digest?: string }, reset:()=>void}){
    return (
        <main>
            <h1>No data!!</h1>
            <button onClick={reset}>reset</button>
        </main>
    )
}