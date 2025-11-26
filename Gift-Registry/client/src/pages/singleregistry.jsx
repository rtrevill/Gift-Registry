import { useParams } from "react-router-dom"

export function SingleRegistry () {
    const {regId} = useParams()

    return (
        <div>
            <h2>Single Registry for {regId}</h2>
        </div>
    )
};