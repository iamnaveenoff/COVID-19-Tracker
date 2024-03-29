import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
// Model
import {Latestupdate} from '../modeles/latestupdate';
import {Globalupdate} from '../modeles/globalupdate';
import {Country} from '../modeles/country';
import {catchError, retry} from 'rxjs/operators';
import {TravelAlert} from '../modeles/travel-alert';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  timeStamp: any;
  baseUrl = 'https://corona.lmao.ninja/v2/';

  private host = 'https://api.coronastatistics.live';
  private covid19 = 'https://api.covid19india.org';

  private mygov = 'https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json?timestamp=1625790600';

  constructor(private http: HttpClient) {
  }

  getLatestUpdate(): Observable<Latestupdate[]> {
    return this.http.get<Latestupdate[]>(this.baseUrl + 'all').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getIndiaStatus() {
    return this.http.get('https://corona.lmao.ninja/v2/countries/India').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTimeStamp() {
    return this.http.get('http://api.coronatracker.com/timestamp').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCovidVaccines() {
   /* this.getTimeStamp().subscribe((res) => {
      this.timeStamp = res;
    });*/
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json?timestamp=1625795547634').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getIndiastateStatus() {
    // return this.http.get('https://ameerthehacker.github.io/corona-india-status/covid19-indian-states.json').pipe(
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getGlobalStatus(): Observable<Globalupdate[]> {
    return this.http.get<Globalupdate[]>(this.baseUrl + 'countries').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFaqdata() {
    return this.http.get('https://api.covid19india.org/faq.json').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getNews() {
    return this.http.get('http://newsapi.org/v2/everything?q=COVID-19&from=2020-02-25&sortBy=publishedAt&apiKey=43f80027f3d5427c8a487fededb5e53e').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTravelAlert(): Observable<TravelAlert> {
    return this.http.get<TravelAlert>('https://api.coronatracker.com/v1/travel-alert').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(type): Observable<Country> {
    return this.http.get<Country>(`${this.host}/countries?sort=${type}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCountry(name): Observable<Country> {
    return this.http.get<Country>(`${this.host}/countries/${name}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTimelineCountry(country) {
    return this.http.get(`${this.host}/timeline/${country}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTimelineGlobal() {
    return this.http.get(`${this.host}/timeline/global`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getDistrictData() {
    return this.http.get(`${this.covid19}/state_district_wise.json`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert('Please inform Developer that API is Down !.');
    return throwError(errorMessage);
  }
}
