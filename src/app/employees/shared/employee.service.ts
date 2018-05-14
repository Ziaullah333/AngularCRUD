import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
 
import {Employee} from'./employee.model'
 
@Injectable()
export class EmployeeService {
  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }
 
  postEmployee(Employee){
  //  var body = JSON.stringify(emp);
    const body = new URLSearchParams(Employee);
    body.set('FirstName', Employee.FirstName);
    body.set('LastName', Employee.LastName);
    body.set('EmpCode', Employee.EmpCode);
    body.set('Position', Employee.Position);
    body.set('Office', Employee.Office);
    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:8080/WebProject/rest/hello/Addemployee',body.toString(), {
      headers : headers
    }).map(res => res.json());
  // var headerOptions = new Headers({'Content-Type': 'application/json; charset=utf-8'});
  // // var headerOptions = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  //   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
  //   return this.http.post('http://localhost:8080/WebProject/rest/hello/Addemployee',body,requestOptions).map(x => x.json());
  }
 
  putEmployee(id, Employee) {
    const body = new URLSearchParams(Employee);
    body.set('FirstName', Employee.FirstName);
    body.set('LastName', Employee.LastName);
    body.set('EmpCode', Employee.EmpCode);
    body.set('Position', Employee.Position);
    body.set('Office', Employee.Office);
    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put('http://localhost:8080/WebProject/rest/hello/Updateemployee/' + id,body.toString(), {
      headers : headers
    }).map(res => res.json());


    // var body = JSON.stringify(emp);
    // //var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var headerOptions = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    //return this.http.put('http://localhost:8080/WebProject/rest/hello/Updateemployee/' + id,
    //   body,
    //   requestOptions).map(res => res.json());
  }
 
  getEmployeeList(){
    this.http.get('http://localhost:8080/WebProject/rest/hello/employeeList')
   .map((data : Response) =>{
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
    })
  }
 
  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:8080/WebProject/rest/hello/' + id).map(res => res.json());

    
  }
}