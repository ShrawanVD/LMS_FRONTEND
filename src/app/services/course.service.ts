import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseUrl = 'https://lms-backend-3nru.onrender.com/api/courses';

  constructor(private http:HttpClient) { }

  getCourseContent() {
    return {
      sections: [
        { title: 'Chapter 1: Welcome', modules: [{ title: 'video 1', completed: true }] },
        { title: 'Chapter 2: Module 1 - Goal Setting and Work-...', modules: [{ title: '7 of 8', completed: false }, { title: '7 of 8', completed: false }, { title: '7 of 8', completed: false }, { title: '7 of 8', completed: false }, { title: '7 of 8', completed: false }] },
        { title: 'Chapter 3: Module 2 - Time Management', modules: [{ title: '6 of 6', completed: true }] },
        { title: 'Chapter 4: Module 3 - How to Increase Your P...', modules: [{ title: '6 of 9', completed: false }] },
        { title: 'Chapter 5: Module 4 - How to Beat Procrastin...', modules: [{ title: '1 of 9', completed: false }] },
      ]
    };
  }

  getAllCourse(){
    return this.http.get(this.courseUrl)
  }

  getCourseById(id:any){
    return this.http.get(`https://lms-backend-3nru.onrender.com/api/lessons/${id}`);
  }
}
