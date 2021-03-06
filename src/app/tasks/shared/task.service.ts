import { Headers, Http, Response } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  public tasksUrl = 'api/tasks';
  public headers = new Headers({'Content-type': 'application/json'});

  constructor(private http: Http) {}

  public getAll(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportant(): Observable<Task[]> {
    return this.getAll()
      .catch(this.handleErrors)
      // .map(tasks => tasks.slice(0, 4));
      .map(tasks => tasks.filter(t => t.id % 2 == 0) );
  }

  public getById(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map(
        (response: Response) => response.json().data as Task
      );
  }

  public create(task: Task): Observable<Task> {
    let url = `${this.tasksUrl}`;
    let body = JSON.stringify(task);

    return this.http.post(url, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map(response => response.json().data as Task)
  }

  public update(task: Task): Observable<Task> {
    let url = `${this.tasksUrl}/${task.id}`;
    let body = JSON.stringify(task);

    return this.http.put(url, body, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => task)
  }

  public delete(id: Number): Observable<null> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .catch(this.handleErrors)
      .map(() => null)
  }

  public searchByTitle(term: string): Observable<Task[]> {
    console.log(term);
    
    let url = `${this.tasksUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map(
        (response) => (response.json().data as Task[])
      )
  }

  // PRIVATE METHODS -----------------------------------------------------------

  private handleErrors(error: Response) {
    console.log('Deu erro: ', error);
    return Observable.throw(error);
  }
}
