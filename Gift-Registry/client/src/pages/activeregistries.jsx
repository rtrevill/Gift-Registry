import { FIND_USER_LISTS } from "../utils/queries";
import { REMOVE_REGISTRY } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client/react";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../utils/pagecontext";
import AuthService from "../utils/auth";

export function ActiveReg () {
    const {loading, error, data} = useQuery(FIND_USER_LISTS, {variables: {ownerId: AuthService.getProfile().data._id}});
    const [regList, setRegList] = useState();
    const [RemoveSingle, {data: data2, loading: loading2, error: error2}] = useMutation(REMOVE_REGISTRY);

    const {setContextValue } = useContext(PageContext);

    console.log(data, loading, error)

    useEffect(() => {
        setContextValue('Registries')
        if(data){
            console.log(data)
            setRegList(data.getUserLists)
        }
    },[data])

    const deleteReg = async(id) => {
        const userID = AuthService.getProfile().data._id;
        try{
            const newList = await RemoveSingle({variables: {regId: id, ownerId: userID}})
            console.log(newList.data);
            setRegList(newList.data.removeRegistry);
        }catch(err){
            console.log(err)
        }
    }

    $(document).ready(function() {
        $('.collapsible').collapsible({
            accordion: true // Set accordion to true for single expansion
        });
    });

  
    return (
        <div>
            {
                error || loading || !regList ?          
                <h2>Please Wait</h2>              
                        :
                <div>
                    {/* {
                        regList.map(single => (
                            <div>
                                { single.owner._id === AuthService.getProfile().data._id ?
                              <div class="row" key={single._id}>
                                <div class="col s12 m6">
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                    <span class="card-title">{single.title}</span>
                                    <p>Occasion: {single.occasion}</p>
                                    <p>Owner: {single.owner.userName}</p>
                                    <p>General Items: {single.general_items.length}</p>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.</p>
                                    </div>
                                    <div class="card-action">
                                    <a href={`/singlecard/${single._id}`}>More Details</a>
                                     <button class="btn waves-effect waves-light" type="submit" name="action" onClick={() => deleteReg(single._id)}>Remove
                                        <i class="material-icons right">delete</i>
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            :
                            <div></div>
                            }
                            </div>
            
                        ))
                    } */}
                   <a class="waves-effect waves-light btn" href="/new">Create New</a> 
                   <ul class="collapsible">
                        <li>
                            <div class="collapsible-header" style={{backgroundColor: "rgba(84, 110, 122, 1)"}}>
                                <i class="material-icons">filter_drama</i>
                                Owner
                            </div>
                            <div class="collapsible-body">
                                {
                                    regList.map(single => (
                                        <div>
                                            { single.owner._id === AuthService.getProfile().data._id ?
                                                <div class="row" key={single._id}>
                                                    <div class="col s12 m6">
                                                    <div class="card blue-grey darken-1">
                                                        <div class="card-content white-text">
                                                        <span class="card-title">{single.title}</span>
                                                        <p>Occasion: {single.occasion}</p>
                                                        <p>Owner: {single.owner.userName}</p>
                                                        <p>General Items: {single.general_items.length}</p>
                                                        <p>I am a very simple card. I am good at containing small bits of information.
                                                        I am convenient because I require little markup to use effectively.</p>
                                                        </div>
                                                        <div class="card-action">
                                                        <a href={`/singlecard/${single._id}`}>More Details</a>
                                                        <button class="btn waves-effect waves-light" type="submit" name="action" onClick={() => deleteReg(single._id)}>Remove
                                                            <i class="material-icons right">delete</i>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                            }
                                        </div>                       
                                    ))
                                }
                            </div>
                        </li>
                        <li>
                            <div class="collapsible-header" style={{backgroundColor: "rgba(84, 110, 122, 1)"}}>
                                <i class="material-icons">place</i>
                                Participant
                            </div>
                            <div class="collapsible-body">
                                {
                                regList.map(single => (
                                    <div>
                                        { single.owner._id !== AuthService.getProfile().data._id ?
                                            <div class="row" key={single._id}>
                                                <div class="col s12 m6">
                                                <div class="card blue-grey darken-1">
                                                    <div class="card-content white-text">
                                                    <span class="card-title">{single.title}</span>
                                                    <p>Occasion: {single.occasion}</p>
                                                    <p>Owner: {single.owner.userName}</p>
                                                    <p>General Items: {single.general_items.length}</p>
                                                    <p>I am a very simple card. I am good at containing small bits of information.
                                                    I am convenient because I require little markup to use effectively.</p>
                                                    </div>
                                                    <div class="card-action">
                                                    <a href={`/singlecard/${single._id}`}>More Details</a>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                    
                                ))
                                }
                            </div>
                        </li>
                    </ul>

                </div>
            }
        </div>
       
    )
};