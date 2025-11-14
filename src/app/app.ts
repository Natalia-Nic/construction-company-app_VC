// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header], // ← ProjectList УБРАН отсюда!
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'construction-company-app';
}