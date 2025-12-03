import { ToastContentProps } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../utils/pagecontext';

export function FinalSignoff({closeToast}: ToastContentProps) {
        const value: Array<string> = useContext(UserContext);
        console.log(value[0]);

        return (
            <div>
                Are you sure you want to invite: 
                <ul>
                    {
                        value.map((idnum: String) => {
                            return <li>{idnum}</li>
                        })
                    }
                </ul>
                <button onClick={() => closeToast("agree")}>Yes</button>
                <button onClick={() => closeToast("refuse")}>No</button>
            </div> 
        )
    }
