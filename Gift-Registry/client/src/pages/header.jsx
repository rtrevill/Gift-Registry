import { useContext, useEffect, useState } from "react";
import { PageContext } from "../utils/pagecontext";

export function Header ({handleLogout, user}) {
    const [prevPage, setPrevPage] = useState('Landing');

    const { contextValue } = useContext(PageContext);

    useEffect(() => { 
        $(`#${prevPage}`).removeClass("active")
        setPrevPage(contextValue)
        $(`#${contextValue}`).addClass("active")
    },[contextValue])

    $( document ).ready(function() {
                $(".dropdown-trigger").dropdown();
                $('.sidenav').sidenav();
    });


    return (
        <>
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="" onClick={handleLogout}>Logout</a></li>
            <li><a href="#!">two</a></li>
            <li class="divider"></li>
            <li><a href="#!">three</a></li>
        </ul>
          <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo right">Logo</a>
                <a href="#" class="center">Logged on as {user.userName}</a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li id="home"><a href="/home" >Home</a></li>
                    <li id="Landing"><a href="/" >LandingPage</a></li>
                    <li id="Registries"><a href="/active">Registries</a></li>
                    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
            <li><a href="" onClick={handleLogout}>Logout</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">data</a></li>
        </ul>
        </>
    )
}