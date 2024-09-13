import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project1';
  sendBtn?: HTMLElement;
  userInput?: HTMLInputElement;
  chatArea?: HTMLElement;

  ngAfterViewInit() {
    this.sendBtn = document.getElementById('send-btn') as HTMLElement;
    this.userInput = document.getElementById('user-input') as HTMLInputElement;
    this.chatArea = document.getElementById('chat-area') as HTMLElement;

    if (this.sendBtn && this.userInput && this.chatArea) {
      this.sendBtn.addEventListener('click', () => {
        this.handleSendMessage();
      });
    } else {
      console.error('One or more elements are missing');
    }
  }

  handleSendMessage() {
    if (this.userInput && this.chatArea) {
      const userMessage = this.userInput.value.trim();
      if (userMessage) {
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user-message';
        userMessageElement.innerHTML = `<p>${userMessage}</p>`;
        this.chatArea.appendChild(userMessageElement);

        this.userInput.value = '';

        // Simulate a bot response
        setTimeout(() => {
          const botResponseElement = document.createElement('div');
          botResponseElement.className = 'message bot-message';
          botResponseElement.innerHTML = `<p>Thanks for your message: "${userMessage}". How else can I assist you?</p>`;
          this.chatArea?.appendChild(botResponseElement);
          this.chatArea!.scrollTop = this.chatArea!.scrollHeight; // Auto-scroll to the bottom
        }, 1000);
      }
    }
  }

};




