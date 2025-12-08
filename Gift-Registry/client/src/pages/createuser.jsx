import { useMutation } from "@apollo/client/react";
import { ADD_USER } from "../utils/mutations";
import { ToastContainer, toast } from 'react-toastify';

export function CreateUser ({swapUser}) {
    const [submitUser, {data, loading, error}] = useMutation(ADD_USER);

    const notify = () => toast("New User Created Successfully, Please login", {
        onClose: ()=>swapUser(false)
    });
    
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