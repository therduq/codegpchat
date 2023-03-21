import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { from, filter, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const APIKEY = environment.openAiKey;

@Injectable({
  providedIn: 'root'
})
export class OpenaiControllerService {

  public responseData:any;
  constructor() { }


  //Init Configuration OpenAI
  readonly configuration = new Configuration({
    apiKey:APIKEY,
    //baseOptions: this.headers
  });

  readonly openai = new OpenAIApi(this.configuration);

 
  /*getDataFromOpenAi(text: string){
    from(this.openai.createCompletion(
      {
        model:'text-davinci-003',
        prompt:text,
        max_tokens:256,
        temperature:0.7
      }
    )).pipe(
      filter( resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data:any) => (
        data.choises && data.choises.length > 0 && data.choises[0].text
      )),
      map(data => data.choises[0].text)
    ).subscribe(data =>{
      console.log(data);
    })
  }*/

 

  async getDataFromOpenAi(text: string) {
    const params = {
      model:'text-davinci-003',
      prompt:text,
      max_tokens:256,
      temperature:0.7
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(APIKEY)
      },
      body: JSON.stringify(params)
    };
    
    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();

    console.log("DATOS>>> ",data.choices[0].text);
       
    return data.choices[0].text;
  }


}
