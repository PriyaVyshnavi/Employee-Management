import {Employee} from './Employee.js';


 var add=document.querySelector('.add');
 var close=document.querySelector('.cancel');
 var save=document.querySelector('.save');
 var window=document.getElementById('modal');
 var addForm = document.getElementById("form1");
 
 var employeedetails=[]

 
export var addbtnclicked;
export var savebtnclicked;

export function modifyAddbtnclicked( value ) { addbtnclicked = value; }
export function modifySavebtnclicked( value ) { savebtnclicked = value; }
addbtnclicked=false;
savebtnclicked=false;
// open popup window on clicking add new button
  add.addEventListener("click", function(e){
    e.preventDefault();
    addbtnclicked=true;
    document.getElementById('modal').style.display="flex";         
  });
 
  save.addEventListener("click",function(e)
  { 
    e.preventDefault();
    savebtnclicked=true;
    console.log("save pressed");
    if(addbtnclicked && savebtnclicked )
    {
      console.log("addbtn="+addbtnclicked +"save btn="+savebtnclicked);
      let newEmp=new Employee();
      newEmp.submitForm();
      savebtnclicked=false;
      if(newEmp.isValidated)
      {
          employeedetails.push(newEmp.getformdata());
          console.log(employeedetails);
          newEmp.resetForm();
        }
    }
    if(addbtnclicked==false && savebtnclicked)
    {
      console.log("addbtn="+addbtnclicked +"save btn="+savebtnclicked);
      let newEmp=new Employee();
      newEmp.updateform();
      savebtnclicked=false;
      newEmp.resetForm();
    }
  });


 


// close popup window on clicking cancel button

close.addEventListener("click", closeWin);
export function closeWin() {
    document.getElementById('modal').style.display="none";
    document.getElementById("form1").reset();
    document.getElementById('form1').querySelectorAll(".error").forEach(element=>
      element.innerHTML=""
    );
   let input= document.getElementById('form1').querySelectorAll("input");
   input.forEach(element => 
     element.style.border='1px solid rgb(133,133,133)'

   );
    new Employee().nonEditable(false);
}





var input = document.getElementById("searchInput");

input.onkeyup = searchFilter;
function searchFilter() {
  var  filter, table, tr, td, i, txtValue;
  
  filter = input.value.toUpperCase();
  table = document.getElementById("employee_table");
  tr = table.getElementsByTagName("tr");
  
  for (let i = 1; i < tr.length; i++) 
  {
    // for(let j=0;j<6;j++)
    // {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) 
      {
        
          txtValue = td.textContent || td.innerHTML;
          console.log(txtValue);
          if (txtValue.toUpperCase().indexOf(filter) > -1) 
          {
            
            tr[i].style.display = "";
            console.log("index  "+txtValue.toUpperCase().indexOf(filter));
          } 
          else 
          {
            tr[i].style.display = "none";
          }
      } 
    // }
  }

         
}






