// src/app/components/project-list/project-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ApplicationForm } from '../../components/application-form/application-form';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ApplicationForm],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectList implements OnInit {
  projects: Project[] = [];
  loading: boolean = true;
  error: string = '';
  selectedProject: Project | null = null;
  showApplicationForm: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Ошибка загрузки проектов';
        this.loading = false;
        console.error('Error loading projects:', error);
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.showApplicationForm = true;
  }

  showDetails(project: Project): void {
    console.log('Детали проекта:', project);
    alert(`🏠 ${project.name}\n\n📐 Площадь: ${project.area}м²\n🛏️ Спальни: ${project.bedrooms}\n🚽 Санузлы: ${project.bathrooms}`);
  }

  onApplicationSubmitted(): void {
    this.showApplicationForm = false;
    this.selectedProject = null;
    alert('✅ Заявка успешно отправлена!');
  }

  onApplicationCancelled(): void {
    this.showApplicationForm = false;
    this.selectedProject = null;
  }
}