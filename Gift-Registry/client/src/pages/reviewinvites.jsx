// import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { DELETE_INVITE, ACCEPT_INVITE } from "../utils/mutations";
import AuthService from '../utils/auth';
import { useSelector, useDispatch } from "react-redux";
import { updateInvites, removesingleinvite } from '../utils/currentUserSlice'


export function ReviewInvites () {
    const [DeleteInvite, {data, loading, error}] = useMutation(DELETE_INVITE);
    const [ApproveInvite, {data: data2, loading: loading2, error: error3}] = useMutation(ACCEPT_INVITE);

    const user = AuthService.getProfile().data._id;

    const currentInvites = useSelector((state) => state.user.invites)
    const dispatch = useDispatch()


    const deleteFunction = async(regId) => {
        const postUser = await DeleteInvite({variables: {regId, inviteeId: user}})
        dispatch(updateInvites(postUser.data.refuseInvite.invites))
    }

    const acceptInvite = async({registryId, inviteId}) => {
        try {
            await ApproveInvite({variables: {   userId: user,
                                                registryId,
                                                inviteId
                                            }})
            .then((response) =>{
                dispatch(removesingleinvite(inviteId));
                console.log(response)
            })

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
            <h2>Review this...</h2>
            <h4></h4>
            {
            currentInvites.map(invite => (             
           <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Registry invite from {invite.host_user.userName}</span>
                    <p>You have been invited to join this gift registry titled {invite.registries.title}</p>
                    <p>To celebrate the occasion of a {invite.registries.occasion}</p>
                    <br />
                    <p>Registry expiration: {new Date(invite.registries.valid_to).toLocaleDateString('en-AU')}</p>
                    </div>
                    <div class="card-action">
                    <a class="waves-effect waves-light btn" style={{width: 120, marginRight: 10}} onClick={() => deleteFunction(invite._id)}><i class="material-icons right">close</i>Refuse</a>
                    <a class="waves-effect waves-light btn" style={{width: 120, marginLeft: 10}} onClick={() => acceptInvite({inviteId: invite._id, registryId: invite.registries._id})}><i class="material-icons right">check</i>Accept</a>
                    </div>
                </div>
                </div>
            </div>
               
            ))
            }
        </div>
    )
}