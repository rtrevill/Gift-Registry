import { useQuery } from "@apollo/client/react";
import { QUERY_ALL } from "../utils/queries";
import { useRef} from "react"
import AuthService from '../utils/auth'

import './innermodal.css'

export function InnerModal ({sendinvite}) {
    const {data, error, loading} = useQuery(QUERY_ALL);
    const userToInvite = useRef([]);

    $(document).ready(function(){
    $('.modal').modal({
        dismissible: false,
    });
    });

    const currentUserId = AuthService.getProfile().data._id;

    const clickUser = (e) => {
        e.preventDefault();
        if (e.target.className !== 'active'){
           $(`#${e.target.id}`).addClass("active");
            userToInvite.current.push(e.target.id)
        }else{
           $(`#${e.target.id}`).removeClass("active");
           const userIndex = userToInvite.current.indexOf(e.target.id)
           userToInvite.current.splice(userIndex, 1)
        }
    }

    const clearClasses = () => {
        const elementsWithActive = document.querySelectorAll('.active');
        elementsWithActive.forEach(element => {
            element.classList.remove('active')
        })
        sendTheInvite()
    }

    const sendTheInvite = () => {       
        const dataSent = {  user: userToInvite.current,
                        };
        userToInvite.current = [];
        if (dataSent && userToInvite.current.length===0){
            sendinvite(dataSent)
        }
    }

    return (
        <>
        {   error ? 
            <h2>Error</h2> :
            loading ? 
            <h2>Loading</h2> :
            <div>
            <div id="modal1" class="modal modal-fixed-footer">
                <div class="modal-content">
                <h4 style={{color: "black"}}>Choose Invitees</h4>
                    <ul id="allUsers">
                        {
                            data.getUsers.filter(singUser => singUser._id !== currentUserId).map((user) => 
                            <li key={user._id} style={{marginLeft: "auto", marginRight: "auto"}}>
                                <a onClick={clickUser} id={user._id} >{user.userName}</a>
                            </li>
                            )
                        }
                    </ul>
                </div>
                <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={clearClasses}>Agree</a>
                </div>
            </div>
            </div>

        }
        </>
    )
}