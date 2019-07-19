import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  
  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get('http://localhost:3000/tasks');
  }

  postTask(task){
    const body = {
      "title":"",
      "userId":"",
      "isDone":false
    };
    const userId = localStorage.getItem("id");
    body["userId"] = userId;
    body["title"] = task;
    console.log(body);
    return this.http.post('http://localhost:3000/tasks', body).subscribe(data => {
      console.log('task is successfully added ', data);
    },
     error => 
      { console.log('Error', error); }
    );  
  }

  getUserTasks(id){
    return this.http.get('http://localhost:3000/tasks?userId=' + id);
  }

  deleteTask(id){
    return this.http.delete('http://localhost:3000/tasks/' + id);
    console.log("deletiiiiiiiiiiiiiiiiiiiiiiiiiiiing");
  }
  updateStatus(task){
    const body = {
      "title":task.title,
      "userId":task.userId,
      "isDone":!task.isDone,
      "id":task.id
  };
    console.log(body);
    return this.http.put('http://localhost:3000/tasks/' + task.id, body).subscribe(data => {
      console.log('checked is successfully updated ', data);
    },
     error => 
      { console.log('Error', error); }
    ); 
  }
  updateTitle(task, edited){
    const body = {
      "title":edited.value,
      "userId":task.userId,
      "isDone":task.isDone,
      "id":task.id
  };
    console.log(body);
    return this.http.put('http://localhost:3000/tasks/' + task.id, body).subscribe(data => {
      console.log('title is successfully updated ', data);
    },
     error => 
      { console.log('Error', error); }
    ); 
  }
}
