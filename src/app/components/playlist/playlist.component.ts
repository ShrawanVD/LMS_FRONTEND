import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{
  courseId: any;
  lessons: any;
  currentContentUrl: SafeResourceUrl ='';
  activeSections: boolean[] = [];
  activeModuleIndex: { lesson: number, video: number } = { lesson: -1, video: -1 };
  activeModuleDescription: string = '';
  activeModuleResources: any;
  view: string = 'description';
  videoTitle: string = '';

  constructor(
    private courseService: CourseService,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      this.getCourseContent(this.courseId);
    });
  }

  toggleSection(index: number): void {
    this.activeSections[index] = !this.activeSections[index];
  }

  getCourseContent(id: any): void {
    this.courseService.getCourseById(id).subscribe({
      next: (res: any) => {
        this.lessons = res; 
        if (this.lessons.length > 0 && this.lessons[0].videos.length > 0) {
          const firstVideo = this.lessons[0].videos[0];
          this.setModuleContent(firstVideo.url, 0, 0);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  setModuleContent(contentUrl: string, lessonIndex: number, videoIndex: number): void {
    this.currentContentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(contentUrl);
    this.setActiveModuleDetails(lessonIndex, videoIndex);
  }

  setActiveModuleDetails(lessonIndex: number, videoIndex: number): void {
    const activeVideo = this.lessons[lessonIndex].videos[videoIndex];
    this.activeModuleDescription = activeVideo.desc || 'No description available';
    this.activeModuleResources = activeVideo.resources || 'No resources available';
    this.videoTitle = activeVideo.title;
  }

  setView(view: string): void {
    this.view = view;
  }
}
