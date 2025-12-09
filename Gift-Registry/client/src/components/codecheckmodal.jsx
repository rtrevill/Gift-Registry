import './codecheckmodal.css';

export function CodeCheckModal () {
const myModal = document.getElementById('myModal');


function openModal(){
        console.log("Open Sesame")
        document.getElementById('myModal').style.display = "block"
}

// Prevent closing when clicking outside the modal
window.onclick = function(event) {
  if (event.target == myModal) {
    // Optionally, you could display a message here or shake the modal
    // to indicate that it cannot be closed without filling the form.
  }
}

function submitForm(e) {
  e.preventDefault();
    console.log(e.target.idnum.value)
    const idnumInput = document.getElementById('idnum');
    
    if (idnumInput.value.length === 6)
    {
    // Data is entered, close the modal
    document.getElementById('myModal').style.display = 'none';
    alert('Data submitted successfully!'); // Optional: display success message
  } else {
    alert('Please enter all required information to close the modal.');
  }
}

    return (
        <div>
         <button id="openModalBtn" onClick={openModal}>Open Modal</button>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <h2>Enter required information</h2>
                    <form id="modalForm" onSubmit={submitForm}>
                        <label for="idnum">6 Digit Number</label>
                        <input type="number" id="idnum" style={{color: 'gray'}}/>
                        <button type="submit"></button>
                    </form>

                </div>      
            </div>   
        </div>
    )
}