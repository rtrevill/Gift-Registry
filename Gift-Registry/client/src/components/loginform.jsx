export function LoginForm ({handleFormSubmit, username, handleInputChange, pword, swapUser}) {
    return(
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
                <div style={{marginTop: 20}}>
                    <a id="newuser" onClick={()=>swapUser(true)}>New User?</a>
                </div>
            </div>
    )
}