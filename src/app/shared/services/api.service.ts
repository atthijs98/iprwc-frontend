import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

/* This is the exact same interface that HttpClient uses. This way, this service wil GET, POST, PUT and DELETE
* the same datatype as the regular HttpClient class. */
interface IApiOptions {
  endPoint?: string;
  body?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    [key: string]: any;
  };
}

/*
*
* This service is almost exactly the same as the HttpClient class, but some stuff like the base url, prefix,
* and options are added for convenience. */
@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http: HttpClient) {}

  private static readonly baseUrl = environment.localhostURL;
  private static readonly prefix = '/API';

  /* GET method to retrieve data from the backend. An url is generated through the given endPoint.
  *
  * Example:
  *
  * this.api.get({ endPoint: `${this.PREFIX}/allProducts` });
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of the service. */
  get(options: IApiOptions): Observable<any> {
    options = this.configureOptions(options);

    try {
      return this.http.get(this.generateUrl(options.endPoint), options.body);
    } catch (error) {
      console.error(error);
    }
  }

  /* POST method to send data to the backend. The Content-Type header is added automatically for convenience.
  * A different header will be added if you change the multipleFiles boolean to true. An url is generated
  * through the given endPoint.
  *
  * Example:
  *
  * this.api.post({
  *  endPoint: `${this.PREFIX}/login`
  *  body: new HttpParams()
  *    .set('username', 'matthijs')
  *    .set('password', '123')
  * });
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of the service. */
  post(options: IApiOptions, multipleFiles: boolean): Observable<any> {
    options = this.configureOptions(options);

    const headers: HttpHeaders = new HttpHeaders();

    if (multipleFiles) {
      headers.set('Content-Type', 'multipart/form-data');
    } else {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    try {
      return this.http.post(this.generateUrl(options.endPoint), options.body, { headers });
    } catch (error) {
      console.error(error);
    }
  }

  /* POST method for JSON files to send to the backend. The Content-Type header is added automatically for convenience.
  * An url is generated through the given endPoint.
  *
  * Example:
  *
  * this.api.postJSON({ endPoint: `${this.PREFIX}/register` }, jsonData);
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of the service. */
  postJSON(options: IApiOptions, jsonData: string) {
    options = this.configureOptions(options);

    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    try {
      return this.http.post(this.generateUrl(options.endPoint), jsonData, { headers });
    } catch (error) {
      console.error(error);
    }
  }

  /* PUT method to replace data in the backend. The Content-Type header is added automatically for convenience.
  * An url is generated through the given endPoint.
  *
  * Example:
  *
  * this.api.put({
  *  endPoint: `${this.PREFIX}/updateUser`,
  *  body: new HttpParams()
  *    .set('username', 'matthijs')
  *    .set('password', '123')
  * });
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of a service. */
  put(options: IApiOptions, multipleFiles: boolean): Observable<any> {
    options = this.configureOptions(options);

    const headers: HttpHeaders = new HttpHeaders();

    if (multipleFiles) {
      headers.set('Content-Type', 'multipart/form-data');
    } else {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    try {
      return this.http.put(this.generateUrl(options.endPoint), options.body, { headers });
    } catch (error) {
      console.error(error);
    }
  }

  /* PUT method for JSON files to replace data in the backend. The Content-Type header is added automatically
  * for convenience. An url is generated through the given endPoint.
  *
  * Example:
  *
  * this.api.putJSON({ endPoint: `${this.PREFIX}/register` }, jsonData);
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of the service. */
  putJSON(options: IApiOptions, jsonData: string) {
    options = this.configureOptions(options);

    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    try {
      return this.http.put(this.generateUrl(options.endPoint), jsonData, { headers });
    } catch (error) {
      console.error(error);
    }
  }

  /* DELETE method to delete something from the backend. The Content-Type is added automatically for convenience.
  * An url is generated through the given endPoint.
  *
  * Example:
  *
  * this.api.delete({ endpoint: `${this.PREFIX}/delete/{id}`, });
  *
  * Whereas the PREFIX is stored in the service and api is the name given in the constructor of a service. */
  delete(options: IApiOptions): Observable<any> {
    options = this.configureOptions(options);

    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    try {
      return this.http.delete(this.generateUrl(options.endPoint), { headers });
    } catch (error) {
      console.error(error);
    }
  }

  /* This method will return the necessary options for an API call. */
  configureOptions = (options: IApiOptions): IApiOptions => {
    options = this.getDefaultOptions(options);

    return options;
  }

  /* This method will return the default options for an API call. If (more) options are added through the POST, GET,
  * DELETE or PUT methods, then these options are added as well. */
  getDefaultOptions = (options: IApiOptions): IApiOptions => {
    const defaultOptions: IApiOptions = {
      endPoint: '',
      body: {
        headers: {
          Authorization: this.getBearerToken()
        }
      }
    };

    return { ...defaultOptions, ...options };
  }

  /* Fetches the url with prefix */
  getApiUrl = (): string => ApiService.baseUrl + ApiService.prefix;

  /* Generates an url with the base url and end point */
  generateUrl = (endPoint: string) => this.getApiUrl() + endPoint;

  private getBearerToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return `Bearer ${token}`;
    }
    return '';
  }
}
