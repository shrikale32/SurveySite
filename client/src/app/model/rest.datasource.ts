/**
 * Shrikant Kale: 301150258,Jefil Tasna John Mohan: 301149710,Vamsi Paladugu: 301174422,Harsh Kansara: 301172063,Dishank Trivedi: 301171796,Keyurkumar Sheladeeya: 301167490
 group:4
 */
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { surveyPageOne } from './surveyPageOne.model';
import { surveyPageTwo } from './surveyPageTwo.model';
import { surveyPageThree } from './surveyPageThree.model';
import { User } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

// const PROTOCOL = 'http';
// const PORT = 5000;

// this is to connect to your backend server
@Injectable({providedIn: 'root'})
export class RestDataSource {
  private baseUrl: string;
  private authToken!: string;
  private user!: User;

  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    this.baseUrl = `${environment.backendUrl}`;
  }

  //survey One 
  saveSurveyOne(surveyOne: surveyPageOne): Observable<surveyPageOne>
  {
    console.log(JSON.stringify(surveyOne));
    return this.http.post<surveyPageOne>(this.baseUrl + 'surveyOne/add', surveyOne);
  }

  getSurveyOne(): Observable<surveyPageOne[]>
  {
    this.loadToken();
    return this.http.get<surveyPageOne[]>(this.baseUrl + 'surveyOne/list', this.httpOptions);
  }

  deleteSurveyOne(id: string) {
    this.loadToken();
    let backendRouterPath = 'surveyOne/delete/'+id // has to be same as on the backend server
    return this.http.delete(this.baseUrl + backendRouterPath, this.httpOptions);
  }
    //Survey One Edit
    getSurveyOneRes(id: string): Observable<surveyPageOne> {
      let backendRouterPath = 'surveyOne/'+id // has to be same as on the backend server
      return this.http.get<surveyPageOne>(this.baseUrl + backendRouterPath);
    }
  
    updateSurveyOneRes(response: surveyPageOne): Observable<surveyPageOne> {
      this.loadToken();
      let backendRouterPath = 'surveyOne/'+response._id  // has to be same as on the backend server
      return this.http.post<surveyPageOne>(this.baseUrl + backendRouterPath, response, this.httpOptions);
    }


  //survey Two
  saveSurveyTwo(surveyTwo: surveyPageTwo): Observable<surveyPageTwo>
  {
    console.log(JSON.stringify(surveyTwo));
    return this.http.post<surveyPageTwo>(this.baseUrl + 'surveyTwo/add', surveyTwo);
  }

  getQuestions(): Observable<surveyPageTwo[]> {
    this.loadToken();
    let backendRouterPath = 'surveyTwo/list' // has to be same as on the backend server
    return this.http.get<surveyPageTwo[]>(this.baseUrl + backendRouterPath,  this.httpOptions);
  }

  surveyTwoDeleteAResponse(id: string) {
    this.loadToken();
    let backendRouterPath = 'surveyTwo/delete/'+id // has to be same as on the backend server
    return this.http.delete(this.baseUrl + backendRouterPath, this.httpOptions);
  }

  // getAQuestion(id: string): Observable<surveyPageTwo> {
  //   let backendRouterPath = 'surveyOne/'+id // has to be same as on the backend server
  //   return this.http.get<surveyPageTwo>(this.baseUrl + backendRouterPath);
  // }



  //survey Three
  saveSurveyThree(surveyThree: surveyPageThree): Observable<surveyPageThree>
  {
    console.log(JSON.stringify(surveyThree));
    return this.http.post<surveyPageThree>(this.baseUrl + 'surveyThree/add', surveyThree);
  }

  getSurveyThree(): Observable<surveyPageThree[]>
  {
    this.loadToken();
    return this.http.get<surveyPageThree[]>(this.baseUrl + 'surveyThree', this.httpOptions);
  }

  deleteSurveyThree(id: string) {
    this.loadToken();
    let backendRouterPath = 'surveyThree/delete/'+id // has to be same as on the backend server
    return this.http.delete(this.baseUrl + backendRouterPath, this.httpOptions);
  }

  
// authentication
  storeUserData(token: any, user: User): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(): boolean {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  authenticate(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  logout(): Observable<any> {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  private loadToken(): void {
    const token = localStorage.getItem('id_token');
    if(token){
      this.authToken = token;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    }
  }

  //create survey template
  getData(url) {
    return this.http.get(`${this.baseUrl}${url}`, this.httpOptions);
  }

  postData(url, data) {
    return this.http.post(`${this.baseUrl}${url}`, data, this.httpOptions);
  }

  // displaySurveys(id: string) {
  //   let backendRouterPath = 'fillSurvey/'+id 
  //   return this.http.get(this.baseUrl + backendRouterPath);
  // }

  //delete Survey Template
  deleteSurvey(id: string) {
    this.loadToken();
    let backendRouterPath = 'survey/delete/'+id // has to be same as on the backend server
    return this.http.delete(this.baseUrl + backendRouterPath, this.httpOptions);
  }


  //delete Survey Reponses
  deleteSurveyResponse(id: string) {
    this.loadToken();
    let backendRouterPath = 'fillSurvey/delete/'+id // has to be same as on the backend server
    return this.http.delete(this.baseUrl + backendRouterPath, this.httpOptions);
  }


}




