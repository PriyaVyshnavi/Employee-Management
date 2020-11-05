import {Employee} from './Employee.js';
import {closeWin,addbtnclicked,savebtnclicked,modifyAddbtnclicked,modifySavebtnclicked} from './main.js';

export function addToStorage()
{
    let employeeObjToString=JSON.stringify(newEmp.getformdata());
    localStorage.setItem('emp',employeeObjToString);

    let toJSONEmp =JSON.parse(employeeObjToString);
    localStorage.getItem(emp);

}