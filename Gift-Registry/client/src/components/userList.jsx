export function UserList ({userDetails}) {
    console.log(userDetails)
    return (
        userDetails ? 
        <div>
            <h2>User List</h2>
            <ul>
                {userDetails.map(user => (
                        <li key={user._id}>{user.userName}</li>
                ))
                }
            </ul>
        </div>
        : 
        <div>Sorry</div>
    )
}