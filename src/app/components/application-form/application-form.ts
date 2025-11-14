// src/app/components/application-form/application-form.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application';
import { CreateApplicationRequest } from '../../models/application.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.html',
  styleUrl: './application-form.scss'
})
export class ApplicationForm {
  @Input() project!: Project; // Проект который выбрал клиент
  @Output() submitted = new EventEmitter<void>(); // Событие успешной отправки
  @Output() cancelled = new EventEmitter<void>(); // Событие отмены

  // Данные формы
  clientComments: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(private applicationService: ApplicationService) {}

  // Отправить заявку
  submitApplication(): void {
    if (!this.project) return;

    this.isLoading = true;
    this.error = '';

    const applicationData: CreateApplicationRequest = {
      projectId: this.project.id,
      clientComments: this.clientComments
    };

    this.applicationService.createApplication(applicationData).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('✅ Заявка успешно отправлена! С вами свяжутся в ближайшее время.');
        this.submitted.emit();
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Ошибка при отправке заявки. Попробуйте еще раз.';
        console.error('Application error:', error);
      }
    });
  }

  // Отмена заявки
  cancel(): void {
    this.cancelled.emit();
  }
}