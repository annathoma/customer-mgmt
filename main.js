import {saveCust,getCust} from "./lib.js";

document.body.onload=getCust();

document.forms[0].addEventListener("submit", async function submitForm(e) {
    e.preventDefault();
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let mobile = document.querySelector("#mobile").value;
    let body = { firstName, lastName,email,mobile };
    let createdCust = await saveCust(body);  
    let { id } = createdCust;
    //let message = `Customer saved successfully with id ${id}`;
    //alert(message);
    getCust();

   
  });

  
  //getCust()