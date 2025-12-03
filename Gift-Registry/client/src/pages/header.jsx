import { useContext, useEffect, useState, useRef } from "react";
import { PageContext } from "../utils/pagecontext";
import { useQuery } from "@apollo/client/react";
import { GET_INVITES } from "../utils/queries";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";

export function Header ({handleLogout, user}) {
    const {data, loading, error} = useQuery(GET_INVITES, {variables: {ownerId: AuthService.getProfile().data._id}})
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
        <div>
              {
                  loading ? <h2>Loading</h2> :
                  error ? <hr>Error</hr> :
        <>
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="" onClick={handleLogout}>Logout</a></li>
            <li><a href="/review">You Have {data.getInvites.invites.length} invites</a></li>
            <li><Link to='/review' state={data.getInvites.invites}>Go to Invites</Link></li>
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
              }      
        </div>
    )
}