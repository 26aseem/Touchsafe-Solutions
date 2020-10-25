import React from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from "./Base"

export default function Home() {
    console.log("API IS", API);
    return (
        <Base title="TouchSafe Solutions" description="Stay TouchFree Stay Safe">
            
        </Base>
    )
}
