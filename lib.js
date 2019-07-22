import config from "./config.js";

export function saveCust(post) {
    return fetch(`${config.endpoint}/customers`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  }
  
  export function getCust() {
    fetch(`${config.endpoint}/customers`)
    .then(function (response) {
        return response.json();  //To get the JSON data from the response, we execute the json() function.
    })
    .then(function (data) {
        appendData(data);
    });
    
    function appendData(data) {

        if(data.length>0)
        {
        //extract the headers and save in col array
        var col = [];

      
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
       

        // to create dynamic table
        var table = document.createElement("table");
        table.setAttribute('id', 'table');
      

        // to create table header using col array

        var tr = table.insertRow(-1);                   

        for (var i = 0; i < col.length-1; i++) {
            var th = document.createElement("th");     //for table header
            th.innerHTML = col[i];
            
            tr.appendChild(th);
            
        }
        var th = document.createElement("th");    
        th.innerHTML="Action";
            tr.appendChild(th);
        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {
            
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length-1; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
            var cell = tr.insertCell(-1);
            var btnRemove = document.createElement("input");
            btnRemove.type = "button";
            btnRemove.value = "Remove";
            btnRemove.onclick= function() {
                var custTab = document.getElementById('table');
                //console.log("printing"+this.parentNode.parentNode.rowIndex);
                var delv= this.parentNode.parentNode.rowIndex;//to get the row number in table
               // console.log(data[delv-1].id)
                var delid=data[delv-1].id;//to get the id to be deleted
                //console.log(data)
               custTab.deleteRow(this.parentNode.parentNode.rowIndex); //delete from table
              //console.log(`${config.endpoint}/customers/${delid}`)
                //to delete from json object
                let message = `Do you want to delete with id ${delid}`;
                alert(message);

                if(message){
                    return fetch(`${config.endpoint}/customers/${delid}` , { 
                        method: 'delete'
                        }) .then(r=> r.json())

                }

            
            }
            cell.appendChild(btnRemove);        
        }
        // adding json data to container
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

    else
document.getElementById("showData").innerHTML="No data available";
    }//appendData



  }