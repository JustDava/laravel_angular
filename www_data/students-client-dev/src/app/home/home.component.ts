import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Student, StudentService} from "../student.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentFormComponent} from "../student-form/student-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, StudentFormComponent, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  students:Student[] = [];
  isLoading: boolean = false;
  response: {status:string, message:string} | undefined;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  findStudent(id: number): Student {
    return <Student>this.students.find(student => student.id === id);
  }

  isUpdating(id: number): boolean {
    return <boolean>this.findStudent(id).isUpdating;
  }

  getStudents() {
    this.isLoading = true;
    this.studentService
      .getStudents()
      .subscribe({
        next:(data:any) => {
          this.isLoading = false;
          this.students = data['data'];
        },
        error: error => {
          this.isLoading = false;
          console.log(error);
          this.response = {status: "error", message: "Ошибка при загрузке списка учеников"}
        }
      });
  }

  deleteStudent(id: number) {
    let student = this.findStudent(id);
    student.isUpdating = true;
    this.studentService
      .deleteStudent(id)
      .subscribe({
        next:() => {
          student.isUpdating = false;
          let index = this.students.findIndex(student => student.id === id);
          this.students.splice(index, 1);
        },
        error: error => {
          student.isUpdating = false;
          console.log(error);
          this.response = {status: "error", message: "Ошибка при удалении ученика"}
        }
      });
  }
}
