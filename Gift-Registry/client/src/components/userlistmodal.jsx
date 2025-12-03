import { InnerModal } from "./innermodal"

export function UserListModal ({sendinvite, regid}) {

    // $(document).ready(function(){
    // $('.modal').modal({
    //     dismissible: false,
    // });
    // });

    return (
        <InnerModal sendinvite={sendinvite} regid={regid}/>
    )
}