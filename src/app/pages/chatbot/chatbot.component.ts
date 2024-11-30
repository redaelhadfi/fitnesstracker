import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: { user: string, bot: string }[] = [];
  userMessage: string = '';
  isOpen = false;

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Add the user's message to the chat view
      this.messages.push({ user: this.userMessage, bot: '' });

      // Send the message to the backend and receive the response
      this.chatbotService.sendMessage(this.userMessage).subscribe(
        response => {
          // Check if response has the expected structure
          if (response && response.response) {
            this.messages[this.messages.length - 1].bot = response.response;
          } else {
            this.messages[this.messages.length - 1].bot = "No response from the server.";
          }
        },
        error => {
          // Handle errors from the backend
          this.messages[this.messages.length - 1].bot = "Error: Could not connect to the chatbot service.";
        }
      );

      // Clear the input field after sending
      this.userMessage = '';
    }
  }
}
