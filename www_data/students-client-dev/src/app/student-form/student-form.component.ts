import {Component, OnInit} from '@angular/core';
import {Student, StudentService} from "../student.service";
import {NgClass} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  id: number | undefined;

  formTitle: string | undefined;

  isLoading: boolean = false;
  student: Student | undefined;
  response: {status:String, message:String} | undefined;

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    if (this.id == undefined) {
      this.formTitle = 'Добавить ученика';
      return;
    }
    this.getStudent(this.id);
    this.formTitle = 'Обновить ученика';
  }

  getStudent(id: number) {
    this.isLoading = true;
    this.studentService
      .getStudent(id)
      .subscribe({
      next:(data: any) => {
        this.isLoading = false;
        this.student = data['data'];
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
        this.response = {status: "error", message: "Ошибка при загрузке ученика"}
      }
    })
  }

  addStudent(first_name: string, last_name: string, patronymic: string, birthday: string, gender: string) {
    this.isLoading = true;
    this.studentService
      .addStudent({
        first_name: first_name,
        last_name: last_name,
        patronymic: patronymic,
        birthday: birthday,
        gender: gender
      }).subscribe({
      next:(data: any) => {
        this.isLoading = false;
        this.student = data['data'];
        this.response = {status: "success", message: "Ученик добавлен"};
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
        this.response = {status: "error", message: "Ошибка при добавлении ученика"}
      }
    })
  }

  updateStudent(id:number, first_name: string, last_name: string, patronymic: string, birthday: string, gender: string) {
    this.isLoading = true;
    this.studentService
      .updateStudent({
        id: id,
        first_name: first_name,
        last_name: last_name,
        patronymic: patronymic,
        birthday: birthday,
        gender: gender
      }).subscribe({
      next:(data: any) => {
        this.isLoading = false;
        this.student = data['data'];
        this.response = {status: "success", message: "Ученик обновлен"};
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
        this.response = {status: "error", message: "Ошибка при обновлении ученика"}
      }
    })
  }
}
