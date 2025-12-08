export function CreateUser ({swapUser}) {
    return (
        <div>
            <h1>Create User</h1>
            <a class="waves-effect waves-purple btn" onClick={()=>swapUser(false)}>back to login</a>
        </div>
    )
}