import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/toDo/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toDoService:ToDoService){}

  todoArray = [];
  tasks:any;
  newTasks:any;

  ngOnInit() {
    this.getTasks();
  }

  addTodo(value){ 
    this.todoArray.push(value);
    console.log(this.todoArray);
    console.log(value);
    this.toDoService.postTask(value);
    // window.location.reload();
  }

  updateChecked(task){
    console.log(task);
    this.toDoService.updateStatus(task);
    window.location.reload();
  }

  updateTodoChecked(todo){
    const id = localStorage.getItem("id");
    this.toDoService.getUserTasks(id).subscribe((res) => {
      this.newTasks = res;
      console.log(this.newTasks);
      for(var i=0;i<this.newTasks.length;i++){
        if(this.newTasks[i]["title"] == todo){
          const task = {
            "title":todo,
            "id":this.newTasks[i]["id"],
            "userId":id,
            "isDone":this.newTasks[i]["isDone"]
          }
          console.log(task);
          this.toDoService.updateStatus(task);
          console.log(task);
          window.location.reload();
        }
      }
    });
  }

  updateTitle(task, edited){
    console.log(task);
    console.log(edited);
    this.toDoService.updateTitle(task, edited);
    window.location.reload();
  }

  updateTodo(todo, edited){
    const id = localStorage.getItem("id");
    this.toDoService.getUserTasks(id).subscribe((res) => {
      this.newTasks = res;
      console.log(this.newTasks);
      for(var i=0;i<this.newTasks.length;i++){
        if(this.newTasks[i]["title"] == todo){
          const task = {
            "title":todo,
            "id":this.newTasks[i]["id"],
            "userId":id,
            "isDone":this.newTasks[i]["isDone"]
          }
          console.log(task);
          this.toDoService.updateTitle(task, edited);
          console.log(task);
          window.location.reload();
        }
      }
    });
  }

  deleteItem(todo){   
    for(let i=0 ;i<= this.todoArray.length ;i++){    
      if(todo == this.todoArray[i]){     
        this.todoArray.splice(i,1)    
      }
    }
    console.log(todo);
    const id = localStorage.getItem("id");
    this.toDoService.getUserTasks(id).subscribe((res) => {
      this.tasks = res;
      for(var i=0;i<this.tasks.length;i++){
        if(this.tasks[i]["title"] == todo){
          const id = this.tasks[i]["id"];
          this.toDoService.deleteTask(id).subscribe(data => {
            console.log('task is successfully deleted ', data);
          },
           error => 
            { console.log('Error', error); }
          );  
          window.location.reload();
          break
        }
      }
    });
  }
  ondeleteItem(todo){
    console.log(todo);
    const taskId = todo["id"];
    console.log(taskId);
    this.toDoService.deleteTask(taskId).subscribe(data => {
      console.log('task is successfully deleted ', data);
    },
     error => 
      { console.log('Error', error); }
    );  
    window.location.reload();
  }

  getTasks(){
    const id = localStorage.getItem("id");
    this.toDoService.getUserTasks(id).subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
    });
  }
}
