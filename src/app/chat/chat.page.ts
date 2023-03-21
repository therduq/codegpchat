import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenaiControllerService } from '../services/openai-controller.service';

export interface Message{
  type:string;
  class:string;
  message:string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('Content') content: any;

  //send query
  public input_Message:any;
  loading:boolean = false;
  active:boolean = true;

  messagesChat: Message[] = [];
  
  
  
  constructor(private openaicontroller: OpenaiControllerService) { 
    
  }

  ngOnInit() {
  }

  SendMessage(){
    this.loading = true;
    this.active = false;

    this.messagesChat.push({
      type:'user',
      class:'question animate__animated animate__bounceInLeft',
      message: this.input_Message
    });

    this.scrollBottom();
    
    console.log("se realizo una pregunta..")
    this.openaicontroller.getDataFromOpenAi(this.input_Message).then((data:any) => {
      console.log("DATA FROM SUBSCRIBE: ", data)
      this.messagesChat.push({
        type:'chatBot',
        class:'gpt-response animate__animated animate__bounceInRight',
        message: data
      });
      this.scrollBottom();
      this.loading = false;
    });

    
    this.input_Message = '';
  }

  scrollBottom() {
    setTimeout(() => {
      try{
        this.content.scrollToBottom(500);
      }catch(err){}
    },1000);
  }

}
