import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatepage } from "../utils/pagesSlice";


export function Home () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updatepage("home"))
    },[])


    return (
        <div>
            <h1>This is the Home Page</h1>
            <a class="waves-effect waves-light btn" href="/">Back</a>
            <br />
        </div>
    )
};