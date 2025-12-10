import { useMutation, useLazyQuery } from "@apollo/client/react";
import { ADD_USER } from "../utils/mutations";
import { GET_PASSCODE } from "../utils/queries";
import { ToastContainer, toast } from 'react-toastify';
import { CodeCheckModal } from "../components/codecheckmodal";
import { useState, useRef, useEffect } from "react";
import md5 from 'md5';

export function CreateUser ({swapUser}) {
    const [submitUser, {data, loading, error}] = useMutation(ADD_USER);
    const [getCode, {loading: loading2, data: data2, error: error2}] = useLazyQuery(GET_PASSCODE);
    const [verified, setVerified] = useState(false)
    const [tempNumber, setTempNumber] = useState(0)
    const rememberNum = useRef(0)
    const remembertime = useRef(0)

    const notify = () => toast("New User Created Successfully, Please login", {
        onClose: ()=>swapUser(false)
    });

    function openModal(){
        document.getElementById('myModal').style.display = "block"
    }

    function submitCode(num){
        const checkIt = md5(toString(num))
        checkIt === rememberNum.current ? 
        console.log("Yes-Siree Bob!!") :
        console.log("No Dice :(")
    }

    const createRandomNumber = async() =>{
        const createdNum = Math.floor(Math.random()*1000000)-1
        const now = Date.now()
        console.log(createdNum)
        rememberNum.current = md5(toString(createdNum));
        remembertime.current = now;
        const emailtosend = document.getElementById('email_address').value
        try {
            await getCode({variables: { receiver: emailtosend,vernum: createdNum}})
            data2
            openModal()                
        } catch (error) {
            console.error(error)
        }
    }    


    // useEffect(()=>{
    //     if (tempNumber !== 0){
    //         document.getElementById('myModal').style.display = "block"
    //     }
    //     else{
    //         document.getElementById('myModal').style.display = "none"
    //     }
    // },[tempNumber])

    const resetCode = (num) => {
        console.log('cancelling')
        setTempNumber(num)
    }
    
    const checkAndSubmit = async(e) => {
        e.preventDefault();
        const target = e.target;
        if (target.password.value !== target.password2.value){
            document.getElementById('password2').classList.add('invalid')
            alert(`passwords don't match`)
            return
        } else if (!target.user_name.value){
            document.getElementById('user_name').classList.add('invalid')
            alert('Username required')
            return
        } else if (!target.email_address.value){
            document.getElementById('email_address').classList.add('invalid')
            alert('Email address required')
            return
        } else {
            try {
                await submitUser({variables: {
                                    userName: target.user_name.value,
                                    firstName: target.first_name.value,
                                    lastName: target.last_name.value,
                                    password: target.password.value,
                                    emailAddress: target.email_address.value
                                }})
                .then(() => {
                    notify();
                })
            } catch (error) {
                switch(error.errors[0].message){
                    case "Email address already registered":
                        alert("Email already registered");
                        break;
                    case "Username already registered":
                        alert("Username already registered");
                        break;
                    default:
                        console.error(error)
                }
            }
        }

    }

    return (
        <div>
            <h1>Create User</h1>
            <ToastContainer 
                autoClose={3000}
                hideProgressBar={true}
            />   
            <CodeCheckModal code={submitCode}/> 
            <button onClick={createRandomNumber}>check open modal and make num button</button>     
            <button onClick={openModal}>Just Open</button>
             <div class="row">
                <form class="col s12" onSubmit={checkAndSubmit}>
                    <div class="row">
                        <div class="input-field col s8">
                        <input id="user_name" type="text" class="validate"/>
                        <label for="user_name">User name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s8">
                        <input id="email_address" type="email" class="validate"/>
                        <label for="email_address">Email address</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s8">
                        <input id="password" type="password"/>
                        <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s8">
                        <input id="password2" type="password" class="validate"/>
                        <label for="password2">confirm Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s5">
                        <input id="first_name" type="text" class="validate"/>
                        <label for="first_name">First Name (optional)</label>
                        </div>
                        <div class="input-field col s5">
                        <input id="last_name" type="text" class="validate"/>
                        <label for="last_name">Last Name (optional)</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-red" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
            <a class="waves-effect waves-purple btn" onClick={()=>swapUser(false)}>back to login</a>
        </div>
    )
}