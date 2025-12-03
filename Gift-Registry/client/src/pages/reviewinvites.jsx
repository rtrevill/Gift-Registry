import { useLocation } from "react-router-dom";

export function ReviewInvites () {
    const location = useLocation()
    const getState = location.state
    console.log(getState, location,)
    return (
        <div>
            <h2>Review this...</h2>
            <h4></h4>
        </div>
    )
}