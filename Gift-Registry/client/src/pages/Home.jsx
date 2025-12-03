import { useEffect, useContext } from "react";
import { PageContext } from "../utils/pagecontext";
import { Link } from "react-router-dom";

export function Home () {
    const { setContextValue } = useContext(PageContext)

    useEffect(() => {
        setContextValue('home')
    },[])


    return (
        <div>
            <h1>This is the Home Page</h1>
            <a class="waves-effect waves-light btn" href="/">Back</a>
            <br />
        </div>
    )
};