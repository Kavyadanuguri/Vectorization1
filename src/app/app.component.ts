import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor
import { NgClass } from '@angular/common'; // Import NgClass

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here for ngIf, ngFor, and ngClass
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ChatGPT Dark Mode';
  userInputText: string = '';
  messages: { content: string; isUser: boolean }[] = [];
  showFeedbackModal: boolean = false;
  feedbackText: string = '';
  feedbackType: 'structured' | 'unstructured' | null = null;




  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chat') chatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  /* selectedFileType: 'structured' | 'unstructured' = 'structured'; // Default value
  structuredFileName: string = '';
  unstructuredFileName: string = '';

  // Handle file selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.selectedFileType === 'structured') {
        this.structuredFileName = file.name;
      } else {
        this.unstructuredFileName = file.name;
      }
    }
  }
  */

  selectedFileType: 'structured' | 'unstructured' = 'structured'; // Default value
  structuredFileName: string = '';
  unstructuredFileName: string = '';
  errorMessage: string = ''; // Property for error message

  // Handle file selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // Determine allowed file extensions
      const allowedStructuredExtensions = ['csv', 'xlsx', 'json', 'xml'];
      const allowedUnstructuredExtensions = ['txt', 'pdf', 'docx', 'doc'];

      if (this.selectedFileType === 'structured') {
        if (allowedStructuredExtensions.includes(fileExtension)) {
          this.structuredFileName = file.name;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'This file type is not supported for structured data.';
          this.structuredFileName = '';
        }
      } else {
        if (allowedUnstructuredExtensions.includes(fileExtension)) {
          this.unstructuredFileName = file.name;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'This file type is not supported for unstructured data.';
          this.unstructuredFileName = '';
        }
      }
    }
  }
  

  ngAfterViewInit() {
    document.getElementById('sendBtn')?.addEventListener('click', () => this.sendMessage());

    this.userInput.nativeElement.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  createChatMessage(content: string, isUser: boolean): HTMLDivElement {
    const message = document.createElement('div');
    message.classList.add('message');
    message.style.textAlign = isUser ? 'right' : 'left';
    message.innerHTML = `<p>${content}</p>`;

    if (!isUser) {
      const feedbackContainer = document.createElement('div');
      feedbackContainer.classList.add('response-feedback');
      feedbackContainer.innerHTML = `
        <button class="feedback-btn" (click)="handleFeedback('like')">👍</button>
        <button class="feedback-btn" (click)="handleFeedback('dislike')">👎</button>
      `;
      message.appendChild(feedbackContainer);

      feedbackContainer.querySelector('button')?.addEventListener('click', (event) => {
        const button = event.target as HTMLButtonElement;
        this.handleFeedback(button.innerText === '👍' ? 'like' : 'dislike');
      });
    }

    return message;
  }

  sendMessage(): void {
    const userText = this.userInput.nativeElement.value;
    if (userText.trim()) {
      this.messages.push({ content: userText, isUser: true });
      this.userInput.nativeElement.value = '';

      setTimeout(() => {
        const botResponse = `This is a response to "${userText}"`;
        this.messages.push({ content: botResponse, isUser: false });
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 1000);
    }
  }

  handleFeedback(type: 'like' | 'dislike'): void {
    if (type === 'like') {
      alert('Thank you for your feedback!');
    } else if (type === 'dislike') {
      this.showFeedbackModal = true;
    }
  }

  submitFeedback(): void {
    alert('Thank you for your feedback!');
    this.showFeedbackModal = false;
  }

  closeFeedbackModal(): void {
    this.showFeedbackModal = false;
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.askFileType();
    }
  }

  askFileType(): void {
    const fileType = prompt('Is the file structured or unstructured? (structured/unstructured)');
    if (fileType === 'structured' || fileType === 'unstructured') {
      alert(`You selected ${fileType} file.`);
    } else {
      alert('Invalid option.');
    }
  }
}
