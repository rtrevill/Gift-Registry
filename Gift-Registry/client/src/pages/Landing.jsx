import './Landing.css';
import { useQuery, useMutation } from '@apollo/client/react';
import { QUERY_ALL } from '../utils/queries';
import { ADD_USER } from '../utils/mutations';
import { useState, useEffect, useContext } from 'react';
import { UserList } from '../components/userList';
import { PageContext } from '../utils/pagecontext';


export function Landing () {
    const { loading, error, data } = useQuery(QUERY_ALL);
    const [addUser, {data: data2}] = useMutation(ADD_USER);
    const [inputs, setInputs] = useState({
        namey: '',
        pword: '', 
    });
    const [listData, setListData] = useState()
    const { setContextValue } = useContext(PageContext);


    useEffect(() => {
        setContextValue('Landing');
    },[])
    
    useEffect(()=>{
        if (data){
            setListData(data.getUsers);
        }
    },[data])

    console.log(listData, data);

    const handleInputChange = (e) => {
        const {target} = e
        if (target.name === "username"){
            setInputs({...inputs, namey: target.value})
        }
        else {
            setInputs({...inputs, pword: target.value})
        }
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try{
            const submitUser = await addUser({variables: {
                userName: inputs.namey,
                password: inputs.pword
            }})
            console.log(submitUser.data.addUser)
            setListData([...listData, submitUser.data.addUser])
        }catch(err){
            console.log(err)
        }
    }

    // const sendData = async(data) => {
    //     const userInput = data.target.username.value;
    //     const passInput = data.target.password.value;
    //     event.preventDefault();
    //     // console.log(event.target.username.value, event.target.password.value)
    //     const userDetails = await addUser( { variables: { userName: userInput, password: passInput}})
    //     console.log(userDetails);
    // }


    return (
        <div>
            <h2>Welcome to Gift Registry for all</h2>
            <UserList userDetails={listData}/>
            <a class="waves-effect waves-light btn-large" href="/home" style={{marginLeft: 20, marginRight: 20}}>Login</a>
            <a class="waves-effect waves-light btn-large" href="/home" style={{marginLeft: 20, marginRight: 20}}>Explore</a>
            <form id='newUserForm' onSubmit={handleFormSubmit}>
                <input type="text" name='username' value={inputs.namey} onChange={handleInputChange}/>
                <input type="text" name='password' value={inputs.pword} onChange={handleInputChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};
