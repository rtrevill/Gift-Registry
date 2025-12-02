import { InnerModal } from "./innermodal"

export function UserListModal ({sendinvite}) {

    // $(document).ready(function(){
    // $('.modal').modal({
    //     dismissible: false,
    // });
    // });

    return (
        <InnerModal sendinvite={sendinvite} />
    )
}