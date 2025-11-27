import { useReducer } from "react";
import { ADD_REGISTRY } from "../utils/mutations";
import { useMutation } from "@apollo/client/react";
import AuthService from "../utils/auth";

const initialFormState = {
    title: '',
    occasion: '',
    valid: ''
};


function reducer(state, action) {
    switch (action.type){
        case "handle_change": 
            return {
                ...state,
                [action.field]: action.value
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`)
        
    }
}

export function CreateNewReg () {
    const [formstate, dispatch] = useReducer(reducer, initialFormState);
    const [addRegister, {data, loading, error}] = useMutation(ADD_REGISTRY);

    function handleInputChange(e) {
        dispatch({
            type: "handle_change",
            field: e.target.name,
            value: e.target.value,
        });
    }

    const completeRegistry = async(e) => {
        e.preventDefault();
        console.log(formstate)
        const profile = AuthService.getProfile();
        try{
            const sendRequest = await addRegister({ 
                variables: {
                    title: formstate.title,
                    occasion: formstate.occasion,
                    valid: formstate.valid,
                    owner: profile.data._id
                }})
            console.log(sendRequest)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <h1>Create New</h1>
            <div>

                <form onSubmit={completeRegistry} style={{width: 500, marginLeft: 'auto', marginRight: 'auto'}}>
                    <label for="Title">Registry Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formstate.title}
                        onChange={handleInputChange}
                    />
                    <label for="Occasion">Occasion</label>
                    <input 
                        type="text" 
                        name="occasion" 
                        value={formstate.occasion}
                        onChange={handleInputChange}
                    />
                    <label for="Valid">Valid until:</label>
                    <input 
                        type="date" 
                        name="valid"
                        value={formstate.valid}
                        onChange={handleInputChange}
                    />
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </>
    )
}