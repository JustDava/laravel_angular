import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface Student {
  id: number,
  first_name: string,
  last_name: string,
  patronymic: string,
  birthday: string,
  gender: string,
  isUpdating: boolean | undefined;
}

const API_URL: string = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private headers: HttpHeaders | undefined;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  getStudent(id: number): Observable<Student> {
    return <Observable<Student>>this.http.get(API_URL + '/students/' + id, {headers: this.headers});
  }

  getStudents(): Observable<Student[]> {
    return <Observable<Student[]>>this.http.get(API_URL + '/students', {headers: this.headers});
  }

  addStudent(student: {
    first_name: string
    last_name: string;
    patronymic: string;
    birthday: string;
    gender: string;
  }): Observable<Student> {
    return <Observable<Student>>this.http.post(API_URL + '/students', student,{ headers: this.headers });
  }

  updateStudent(student: {
    id: number,
    first_name: string
    last_name: string;
    patronymic: string;
    birthday: string;
    gender: string;
  }): Observable<Student> {
    return <Observable<Student>>this.http.put(API_URL + '/students', student,{ headers: this.headers });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(API_URL + '/students/' + id, { headers: this.headers });
  }
}
