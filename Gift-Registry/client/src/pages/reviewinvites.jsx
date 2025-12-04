import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { DELETE_INVITE } from "../utils/mutations";
import AuthService from '../utils/auth';


export function ReviewInvites () {
    const [DeleteInvite, {data, loading, error}] = useMutation(DELETE_INVITE);
    const location = useLocation()
    const getState = location.state
    console.log(getState, location,)

    const user = AuthService.getProfile().data._id;


    const deleteFunction = async(regId) => {
        const postUser = await DeleteInvite({variables: {regId, inviteeId: user}})
        console.log(regId, postUser)
    }

    return (
        <div>
            <h2>Review this...</h2>
            <h4></h4>
            {
            getState.map(invite => (             
           <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Registry invite from {invite.host_user.userName}</span>
                    <p>You have been invited to join this gift registry titled {invite.registries.title}</p>
                    <p>To celebrate the occasion of a {invite.registries.occasion}</p>
                    <br />
                    <p>Registry expiration: {new Date(getState[0].registries.valid_to).toLocaleDateString('en-AU')}</p>
                    </div>
                    <div class="card-action">
                    <a class="waves-effect waves-light btn" style={{width: 120, marginRight: 10}} onClick={() => deleteFunction(invite._id)}><i class="material-icons right">close</i>Refuse</a>
                    <a class="waves-effect waves-light btn" style={{width: 120, marginLeft: 10}}><i class="material-icons right">check</i>Accept</a>
                    </div>
                </div>
                </div>
            </div>
               
            ))
            }
        </div>
    )
}