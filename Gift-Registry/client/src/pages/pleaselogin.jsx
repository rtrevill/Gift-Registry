import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

export function PleaseLogin ({setIsLoggedIn}) {
    const [login, {error, data}] = useMutation(LOGIN_USER);
    const [username, setUsername] = useState('');
    const [pword, setPword] = useState('');

    const navigate = useNavigate();

    	const handleAuth = async (token) => {
		// Always perform login here using AuthService
		// If operation is successful, update isLoggedIn and redirect to another page
		const loggedIn = await AuthService.login(token);

		// If the user is successfully logged in or signed up (i.e., loggedIn is true)
		if (loggedIn) {
			// Update isLoggedIn state to true
			setIsLoggedIn(true);
			// Navigate
			navigate('/');
		}
	};


    useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            handleAuth(data.login.token)
        }
    },[error, data]);

    const handleInputChange = (e) => {
        const {target} = e;
        target.name === "loginName" ?
            setUsername(target.value) :
            setPword(target.value)
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        console.log(username, pword)
        try {
            await login({
                variables: { input: {userName: username, password: pword}}
            });
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            {/* <h1>Please Login</h1> */}
            <div style={{width: '400px', marginLeft: 'auto', marginRight: 'auto'}}>
                <form action="" onSubmit={handleFormSubmit}>
                    <label for="loginName" style={{fontSize: 20}}>UserName</label>
                    <input 
                        type="text" 
                        id="loginName" 
                        name="loginName" 
                        style={{marginBottom: 30}}
                        value={username}
                        onChange={handleInputChange}
                    />
                    <label for="loginPassword" style={{fontSize: 20}}>Password</label>
                    <input 
                        type="password" 
                        id="loginPassword" 
                        name="loginPassword" 
                        style={{marginBottom: 30}}
                        value={pword}
                        onChange={handleInputChange}
                    />
                    <button class="btn waves-effect waves-light" type="submit" name="action">Login
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </div>
    )
};