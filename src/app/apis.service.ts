import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: Http) {
  }
  getRepo(name) {
    return this.http.get(`https://api.github.com/users/` + name + `/repos`).pipe(map(
      (response: Response) => {
        return response.json();
      }
    ));
  }
  getRepoName(name,repro) {
    return this.http.get(`https://api.github.com/repos/` + name + `/` + repro).pipe(map(
      (response: Response) => {
        return response.json();
      }
    ));
  }

}
