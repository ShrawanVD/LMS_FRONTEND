import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 
  // courses: any;
  textButton: any;
 
  courses = [
    {
      _id: "course1",
      title: "English Course",
      thumbnail: "https://res.cloudinary.com/ddkfnfogy/image/upload/v1718778450/English_Thumbnail_m2gsfn.png",
      duration: "24 Hours",
      language: "english",
      progress: 20
    },
    {
      _id: "course2",
      title: "Korean Course",
      thumbnail: "https://res.cloudinary.com/ddkfnfogy/image/upload/v1718778450/Korean_Thumbnail_qf1oed.png",
      duration: "25 Hours",
      language: "korean",
      progress: 10
    },
    {
      _id: "course3",
      title: "French Course",
      thumbnail: "https://res.cloudinary.com/ddkfnfogy/image/upload/v1718778450/French_Thumbnail_g2rfkg.png",
      duration: "25 Hours",
      language: "french",
      progress: 0
    }
  ];
 
  constructor(public userService: UserService, private router: Router, private courseService: CourseService) { }
 
  ngOnInit(): void {
    this.userService.profile();
    this.courses;
    // this.getCourses();
  }
 
  // logOut(){
  //   localStorage.removeItem('token');
  //   // this.isUserLoggedIn.next(false);
  //   this.router.navigate(['/']);
  // }
 
  // getCourses(){
  //   this.courseService.getAllCourse().subscribe({
  //     next:(res:any)=>{
  //       this.courses = res;
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }
 
  // userName = 'Shubham';
  searchQuery = '';
  filters = ['All', 'In Progress', 'Completed'];
  selectedFilter = 'All';
 
  setFilter(filter: string) {
    this.selectedFilter = filter;
  }
 
  openCourse(id: any) {
    this.router.navigate(['/playlist', id]);
  }
 
}
 