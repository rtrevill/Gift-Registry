import { useQuery } from "@apollo/client/react";
import { QUERY_ALL } from "../utils/queries";
import { useState, useRef} from "react"
import './innermodal.css'

export function InnerModal ({sendinvite, regid}) {
    // const [userToInvite, setUserToInvite] = useState([])
    const {data, error, loading} = useQuery(QUERY_ALL);
    const userToInvite = useRef([]);

    $(document).ready(function(){
    $('.modal').modal({
        dismissible: false,
    });
    });

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

    const sendTheInvite = () => {
        const dataSent = {  user: userToInvite.current,
                            register: regid
                        };
        sendinvite(dataSent)
    }

    return (
        <>
        {   error ? 
            <h2>Error</h2> :
            loading ? 
            <h2>Loading</h2> :
            <div>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Invite Others <i class="material-icons right">person add</i></a>

            <div id="modal1" class="modal modal-fixed-footer">
                <div class="modal-content">
                <h4 style={{color: "black"}}>Choose Invitees</h4>
                    <ul id="allUsers">
                        {
                            data.getUsers.map((user) => 
                            <li key={user._id} style={{marginLeft: "auto", marginRight: "auto"}}>
                                <a onClick={clickUser} id={user._id} >{user.userName}</a>
                            </li>
                            )
                        }
                    </ul>
                </div>
                <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={sendTheInvite}>Agree</a>
                </div>
            </div>
            </div>

        }



        </>
    )
}