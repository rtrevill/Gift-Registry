import './Landing.css';
import { useQuery, useMutation } from '@apollo/client/react';
import { QUERY_ALL } from '../utils/queries';
import { ADD_USER } from '../utils/mutations';
import { useState, useEffect, useContext } from 'react';
import { UserList } from '../components/userList';
import { useSelector, useDispatch } from 'react-redux';
import { toralph, toanyone, updateInvites } from '../utils/currentUserSlice';
import { updatepage } from '../utils/pagesSlice';


export function Landing () {
    const { loading, error, data } = useQuery(QUERY_ALL);
    const [addUser, {data: data2}] = useMutation(ADD_USER);
    const [inputs, setInputs] = useState({
        namey: '',
        pword: '', 
    });
    const [listData, setListData] = useState()


    const nameData = useSelector((state) => state.user.name)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(updatepage("Landing"))
        if (data){
            setListData(data.getUsers);
        }
    },[data])


    const handleInputChange = (e) => {
        const {target} = e
        if (target.name === "username"){
            setInputs({...inputs, namey: target.value})
        }
        else {
            setInputs({...inputs, pword: target.value})
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try{
            const nameentered = document.getElementById("first_name").value
            dispatch(toanyone(nameentered))
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <h2>Welcome to Gift Registry for all</h2>
            <h3>Current name: {nameData}</h3>
            <UserList userDetails={listData}/>
            {/* <a class="waves-effect waves-light btn-large" href="" style={{marginLeft: 20, marginRight: 20}} onClick={()=>dispatch(toralph())}>Ralph</a>
            <a class="waves-effect waves-light btn-large" href="" style={{marginLeft: 20, marginRight: 20}}>Explore</a> */}
            <button onClick={()=>dispatch(toralph())}>Ralph</button>
             <div class="row">
    <form class="col s12" onSubmit={handleFormSubmit}>
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="" id="first_name" type="text" class="validate"/>
          <label for="first_name">Enter Name</label>
        </div>
        <button type="submit">Send Name</button>
      </div>
    </form>
                <button onClick={()=>dispatch(updateInvites(["Yellow"]))}>Update Invites</button>
  </div>
        </div>
    )
};
