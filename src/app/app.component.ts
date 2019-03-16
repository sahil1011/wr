import { ApisService } from './apis.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  arr: any;
  repoarr: any;
  tb = [];
  name: string;
  favRepo: any;
  favRepoId: any;
  favrepoarr = [];
  onlyFav = {};
  onlyfavArr = [];
  tbCopy = [];
  checkboxFav = false;
  repro: string='';
  constructor(public ss: ApisService) {
  }
  ngOnInit() {

  }

  getRepo() {
    if (this.repro === '') {
      this.ss.getRepo(this.name).subscribe((res: any[]) => {
        this.arr = res;
        this.tb = [];
        for (const co of this.arr) {
          this.tb.push(co);
        }
      }

      );
    }
    else {
      this.ss.getRepoName(this.name, this.repro).subscribe((res: any) => {
        this.repoarr = res;
        this.tb = [];
        this.tb.push(this.repoarr);
      }
      );
    }
  }
    FavouriteOnly(e) {
      const fav = localStorage.getItem('favArray');
      if (e && fav) {
        this.tb = JSON.parse(fav);
      } else if (e && !fav) {
        this.tb = [];
      } else {
        this.tb = this.tbCopy;
      }
    }
    checkIfFav(id) {
      let fav = localStorage.getItem('fav');
      if (fav) {
        fav = JSON.parse(fav);
        if (fav[id] == id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    addFav(favData, id) {
      const fav = localStorage.getItem('fav');
      const favArr = localStorage.getItem('favArray');
      if (fav) {
        const storeFav = JSON.parse(fav);
        storeFav[id] = id;
        this.onlyfavArr = JSON.parse(favArr);
        this.onlyfavArr.push(favData);
        localStorage.setItem('fav', JSON.stringify(storeFav));
        localStorage.setItem('favArray', JSON.stringify(this.onlyfavArr));
      } else {
        this.onlyFav[id] = id;
        this.onlyfavArr.push(favData);
        localStorage.setItem('fav', JSON.stringify(this.onlyFav))
        localStorage.setItem('favArray', JSON.stringify(this.onlyfavArr));
      }

    }

    removeFav(favData, id) {
      const fav = JSON.parse(localStorage.getItem('fav'));
      const favArr = JSON.parse(localStorage.getItem('favArray'));
      favArr.forEach(function (element, i) {
        if (element.id == id) {
          favArr.splice(i, 1);
          return null;
        }
      }, this);
      delete fav[id];
      localStorage.setItem('fav', JSON.stringify(fav));
      localStorage.setItem('favArray', JSON.stringify(favArr));
    }

  }
