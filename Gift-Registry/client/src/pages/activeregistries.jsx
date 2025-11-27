import { QUERY_LISTS } from "../utils/queries";
import { useQuery } from "@apollo/client/react";
import { useContext, useEffect } from "react";
import { PageContext } from "../utils/pagecontext";

export function ActiveReg () {
    const {loading, error, data} = useQuery(QUERY_LISTS);

    console.log(data)

    const {setContextValue } = useContext(PageContext);

    useEffect(() => {
        setContextValue('Registries')
    },[])
    
    return (
        <div>
            {
                error || loading ?          
                <h2>Please Wait</h2>              
                        :
                <div>
                    {
                        data.getLists.map(single => (
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
            
                        ))
                    }
                   <a class="waves-effect waves-light btn" href="/new">Create New</a> 
                </div>
            }
        </div>
       
    )
};