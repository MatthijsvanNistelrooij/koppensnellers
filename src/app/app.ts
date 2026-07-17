import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Headline {
  image: string;
  count: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  headlines: Headline[] = [
    { image: 'headline1.jpg', count: 9 },
    { image: 'headline2.jpg', count: 4 },
    { image: 'headline3.jpg', count: 11 },
    { image: 'headline4.jpg', count: 10 },
  ];

  currentHeadline!: Headline;

  hidden = false;
  userGuess: number | null = null;
  result = '';

  timer = 0;
  timerInterval: any;
  timerDuration = 3; // seconds

  startGame() {
    this.result = '';
    this.userGuess = null;
    this.hidden = false;

    this.timer = 0;

    clearInterval(this.timerInterval);

    this.currentHeadline =
      this.headlines[Math.floor(Math.random() * this.headlines.length)];

    this.startTimer();
  }

  startTimer() {
    const interval = 100;

    this.timerInterval = setInterval(() => {
      this.timer += (interval / 1000) * (100 / this.timerDuration);

      if (this.timer >= 100) {
        this.timer = 100;
        clearInterval(this.timerInterval);
        this.hidden = true;
      }
    }, interval);
  }

  submitGuess() {
    if (this.userGuess === null) return;

    const correct = this.currentHeadline.count;

    this.result =
      this.userGuess === correct
        ? `✅ Correct! It was ${correct}`
        : `❌ Nope. It was ${correct}`;
  }
}
