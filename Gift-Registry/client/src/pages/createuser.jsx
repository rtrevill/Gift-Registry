export function CreateUser ({swapUser}) {

    const checkAndSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        console.log(e.target.user_name.value)
        if (target.password.value !== target.password2.value){
            document.getElementById('password2').classList.add('invalid')
            alert(`passwords don't match`)
        }

    }

    return (
        <div>
            <h1>Create User</h1>
             <div class="row">
                <form class="col s12" onSubmit={checkAndSubmit}>
                    <div class="row">
                        <div class="input-field col s8">
                        <input id="user_name" type="text"/>
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