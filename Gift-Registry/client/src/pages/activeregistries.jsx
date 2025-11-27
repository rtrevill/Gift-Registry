import { QUERY_LISTS } from "../utils/queries";
import { REMOVE_REGISTRY } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client/react";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../utils/pagecontext";
import AuthService from "../utils/auth";

export function ActiveReg () {
    const {loading, error, data} = useQuery(QUERY_LISTS);
    const [regList, setRegList] = useState();
    const [RemoveSingle, {data2, loading2, error2}] = useMutation(REMOVE_REGISTRY, {onSuccess: {updateList}})

    console.log(data)

    const {setContextValue } = useContext(PageContext);

    useEffect(() => {
        setContextValue('Registries')
        if(data){
            setRegList(data)
        }
    },[data])

    function updateList(){
        setRegList(data2)
    }

    const deleteReg = async(id) => {
        const userID = AuthService.getProfile().data._id;
        try{
            await RemoveSingle({variables: {regId: id, ownerId: userID}})
        }catch(err){
            console.log(err)
        }
    }


  
    return (
        <div>
            {
                error || loading || !regList ?          
                <h2>Please Wait</h2>              
                        :
                <div>
                    {
                        regList.getLists.map(single => (
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
            
                        ))
                    }
                   <a class="waves-effect waves-light btn" href="/new">Create New</a> 
                </div>
            }
        </div>
       
    )
};