export{Employee};
import {closeWin,addbtnclicked,savebtnclicked,modifyAddbtnclicked,modifySavebtnclicked} from './main.js';
var selectedRow = null;


var name = document.getElementById('Name');
var emailv = document.getElementById('email');
var phone = document.getElementById('phone');
var address=document.getElementById('address');

var name_error = document.getElementById('nameErr');
var email_error = document.getElementById('emailErr');
var phone_error = document.getElementById('phoneErr');
var address_error = document.getElementById('addressErr');
var gender_error=document.getElementById('genderErr');
var state_error=document.getElementById('stateErr');


class Employee{
  constructor(formData,isValidated) {
   this.formData = {};
    this.isValidated=false;
  }
  setformdata(){
    this.formData=this.readFormData();
    console.log(this.formData);
  }

    getformdata()
    {
      return this.formData;
    }
   
    

    submitForm(){
      console.log("in submit form");
      // let isValidated=false;
         if (this.validate()) 
         {
            console.log("validation success");
            this.isValidated=true;
            this.setformdata();
            this.nonEditable(false);         
            this.addRows(this.getformdata());
            // document.getElementById("address").innerHTML=this.getformdata().address;
            // document.getElementById('view-address').innerHTML=this.getformdata().address;
            this.resetForm();
            closeWin();
            modifyAddbtnclicked(false);
        }
        else{
            console.log("subbmitted form not validated");
            modifyAddbtnclicked(true);
        }
       
    }

    updateform()
    {
      // let isValidated=false;
      console.log("in update form");
      if(this.validate())
      {
        console.log("validation success");
        this.isValidated=true;
        this.setformdata();
        this.nonEditable(false);
        console.log(this.getformdata());
        this.updateRecord(this.getformdata()); 
        // document.getElementById("address").innerHTML=this.getformdata().address;
        // document.getElementById('view-address').innerHTML=this.getformdata().address;
        this.resetForm();
        closeWin();
      }
    }

    readFormData()
    {
               
        let formData={};
        let fullName=document.getElementById('Name').value;
        let nameParts=fullName.split(' ');
        
        formData['firstName']=nameParts[0];
        formData['lastName']=nameParts[nameParts.length-1];

        formData['email']=document.getElementById("email").value;
        formData['phone']=document.getElementById("phone").value;
        formData['address']=document.getElementById("address").value;
        // document.getElementById('view-address').innerHTML="hello";

        let gender = document.getElementsByName('gender');
        let gender_selected;
        for(let i = 0; i < gender.length; i++){
            if(gender[i].checked){
                gender_selected = gender[i].value;
            }
        }
        formData['gender']=gender_selected;

        let state = document.getElementsByName('state');
        let state_selected;
        for(let i = 0; i < state.length; i++){
            if(state[i].checked){
                state_selected = state[i].value;
            }
        }
        formData['state']=state_selected;
        return formData;
        

    }

    nonEditable(bool)
    {
       if(bool==true)
       { document.getElementById("email").style.backgroundColor='#e6e6e6';
        document.getElementById("email").style.border='none';
        document.getElementById("email").readOnly = true;
        }
        else{
        document.getElementById("email").style.backgroundColor='white';
        document.getElementById("email").style.border='1px solid  rgb(133,133,133)';
        document.getElementById("email").readOnly = false;

        }
       
    }


    addRows(data){
       
        var table = document.getElementById('employee_table').getElementsByTagName('tbody')[0];
        var tr = table.insertRow();

        var fnameCell = tr.insertCell();
        var lnameCell= tr.insertCell();
        var genderCell = tr.insertCell();
        var emailCell = tr.insertCell();
        var phoneCell = tr.insertCell();
        var StateCell = tr.insertCell();
        var actions = tr.insertCell();

        var viewbtn = document.createElement('a');
        viewbtn.innerHTML = "<i class='fa fa-file-o' aria-hidden='true'></i>";                   
        actions.appendChild(viewbtn);  

        var editbtn = document.createElement('a');
        editbtn.innerHTML = "<i class='fa fa-pencil' aria-hidden='true'></i>";                   
        actions.appendChild(editbtn);  

        var deletebtn = document.createElement('a');
        deletebtn.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";                   
        actions.appendChild(deletebtn); 

        fnameCell.innerHTML=data.firstName;
        lnameCell.innerHTML=data.lastName;
        genderCell.innerHTML=data.gender;
        emailCell.innerHTML=data.email;
        phoneCell.innerHTML=data.phone;
        StateCell.innerHTML=data.state;
        // document.getElementById("address").innerHTML=data.address;
        // document.getElementById('view-address').innerHTML=data.address;

        if(data.state=='inactive')
            {
                
               
                document.querySelectorAll('tr')[tr.rowIndex].style.color='#939090';
                document.querySelectorAll('tr')[tr.rowIndex].style.fontStyle = "italic";
            }
            
        
        let self=this;
        
        

        editbtn.onclick =

        function(){
          
            document.getElementById('modal').style.display="flex";

            selectedRow = this.parentElement.parentElement;
            
            document.getElementById("Name").value = selectedRow.cells[0].innerHTML+" "+selectedRow.cells[1].innerHTML;
            self.nonEditable(true);
            document.getElementById("email").value = selectedRow.cells[3].innerHTML;
            let n=document.getElementById("email").value;
            document.getElementById("phone").value = selectedRow.cells[4].innerHTML;
            
            let formData =self.getformdata();
            document.getElementById("address").innerHTML=formData.address;
            

            if(formData['gender']=='female'){
                document.getElementsByName('gender')[1].checked=true;
            }
            else{
                document.getElementsByName('gender')[0].checked=true;
            }

            if(formData['state']=='active'){
                document.getElementsByName('state')[0].checked=true;
            }
            else{
                document.getElementsByName('state')[1].checked=true;
            }
            
           
        };

        deletebtn.onclick=
        function()
        {
            if (confirm('Are you sure to delete this record ?')) {
               let row = this.parentElement.parentElement;
                document.getElementById("employee_table").deleteRow(row.rowIndex);
                self.resetForm();
            }

        }

        viewbtn.onclick=function()
        {
            document.getElementById('employeesection').style.marginRight = "0";
            document.getElementById("sidePanel").classList.add('slide-in');

            let formData =self.getformdata();
            document.getElementById("view-address").innerHTML=formData.address;
        }

        document.querySelector('.fa.fa-forward').addEventListener('click',function() {
            document.getElementById('employeesection').style.marginRight = "0";

            document.getElementById("sidePanel").classList.remove('slide-in');
        });

        document.querySelector(".fa.fa-thumb-tack").addEventListener('click',function() {
            document.getElementById('employeesection').style.marginRight = "350px";
            
        });
    }

    resetForm()
    {
        document.getElementById("form1").reset();
        
        // document.getElementById("address").innerHTML=""
        // console.log("address = "+ document.getElementById("address").innerHTML);
        selectedRow=null;
        this.nonEditable(false);
    }

    updateRecord(formData){

        console.log(selectedRow);
        console.log(formData.gender);
        console.log(formData.address);
        selectedRow.cells[0].innerHTML=formData['firstName'];
        selectedRow.cells[1].innerHTML=formData['lastName'];
        selectedRow.cells[2].innerHTML=formData['gender'];
        selectedRow.cells[3].innerHTML=formData['email'];
        selectedRow.cells[4].innerHTML=formData['phone'];
        selectedRow.cells[5].innerHTML=formData['state'];  
        // this.setformdata()['address']=document.getElementById('address');
        // document.getElementById("address").innerHTML=formData.address;
        // document.getElementById('view-address').innerHTML=formData.address;
        

        if(formData.state=='inactive')
            {
              selectedRow.style.color="#939090";
              selectedRow.style.fontStyle="italic";
              // document.querySelectorAll('tr')[tr.rowIndex].style.fontStyle = "italic";
            }
            if(formData.state=='active')
            {
              selectedRow.style.color="black";
              selectedRow.style.fontStyle="normal";

            }
    }

        

    validate()
    {
        var val=false;
        // name.onblur= function() {
            if (name.value=="") { // not email
              name.classList.add('invalid');
              name_error.innerHTML = 'Please enter name';
              console.log("name not validated");
              val= false;
             
            }
            else{
                val=true;
            }
        //   };
          name.onfocus = function() {
            if (this.classList.contains('invalid')) {
              // remove the "error" indication, because the user wants to re-enter something
              this.classList.remove('invalid');
              name_error.innerHTML = "";
              // val=true;
              
            }
          };

          var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //   emailv.onblur= function() {
          if(!emailv.value.match(mailformat))
          {
            emailv.classList.add('invalid');
            email_error.innerHTML = 'Please enter a valid email.';
            console.log("email not validated");
            val= false;
            
          }
          else{
            if(val==true)val=true;
            else val=false;
          }
        // };
          emailv.onfocus = function() {
            if (this.classList.contains('invalid')) {
              this.classList.remove('invalid');
              email_error.innerHTML = "";
              // val=true;
            }
          };

          var phoneno = /^\d{10}$/;
          if (!phone.value.match(phoneno)) { 
            phone.classList.add('invalid');
            phone_error.innerHTML = 'Please enter 10 digit phone number';
            console.log("phone not validated");
            val= false;
            
          }
          else{
            if(val==true)val=true;
            else val=false;
          }

          phone.onfocus = function() {
            if (this.classList.contains('invalid')) {
              
              this.classList.remove('invalid');
              phone_error.innerHTML = "";
              // val=true;
            }
          };

          if (address.value=="") { 
            address.classList.add('invalid');
            address_error.innerHTML = 'Please enter address';
            val= false;
          }
          else{
            if(val==true)val=true;
            else val=false;
          }
  
        address.onfocus = function() {
          if (this.classList.contains('invalid')) {
            this.classList.remove('invalid');
            address_error.innerHTML = "";
            // val=true;
          }
        };


        if ( ( document.vform.gender[0].checked == false ) && (  document.vform.gender[1].checked == false ) )
        {
            gender_error.innerHTML='Please select gender';
            val= false
        }
        else{

            gender_error.innerHTML='';
            if(val==true)val=true;
            else val=false;
        }

        if ( ( document.vform.state[0].checked == false ) && (  document.vform.state[1].checked == false ) )
        {
            state_error.innerHTML='Please select state';
            val= false;
        }
        else{

            state_error.innerHTML='';
            if(val==true)val=true;
            else val=false;
        }
       
          return val;
          
    }
   

}


document.querySelectorAll("th").forEach(function(item,index)
 {
    item.addEventListener('click',function()
    {
        let n=index;
        // console.log(n);
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("employee_table");
        switching = true;
       
        dir = "asc"; 
        
        while (switching) {
         
          switching = false;
          rows = table.rows;
         
          for (i = 1; i < (rows.length - 1); i++) 
          {
            
            shouldSwitch = false;
            
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                
                shouldSwitch= true;
                break;
              }
            } 
            else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          
            switchcount ++;      
          }
           else {
            
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        };
        
    })
});
