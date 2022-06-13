import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITodo} from "../models/todo";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITodo[] = [];
  inProgress: ITodo[] = [];
  done: ITodo[] = [];
  updatedIndex: any;
  isEditEnabled: boolean = false;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  drop(event: CdkDragDrop<ITodo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  resetTodo() {
    this.todoForm.reset();
  }
  addTodo() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.resetTodo();
  }
  removeTodo(index: number) {
    this.tasks.splice(index, 1);
  }
  removeInProgress(index: number) {
    this.inProgress.splice(index, 1);
  }
  removeDone(index: number) {
    this.done.splice(index, 1);
  }
  editTodo(item: ITodo, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedIndex = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.tasks[this.updatedIndex].description = this.todoForm.value.item;
    this.tasks[this.updatedIndex].done = false;
    this.todoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;
  }
}
