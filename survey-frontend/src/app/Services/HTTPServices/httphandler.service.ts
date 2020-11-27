import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const basicUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class HttphandlerService {

  constructor(private httpClient: HttpClient) { }

  apiGet(routeURL, content_type?, isCompleteURI?) {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    const obj: any = {};
    if (!content_type) {
      headers.append('Content-Type', 'application/json');
    }
    else {
      obj.responseType = 'text';
    }
    obj.headers = headers;
    let uri = basicUrl + routeURL;
    if (isCompleteURI) {
      uri = routeURL;
    }
    return this.httpClient.get(uri, obj)
  };

  apiPut(routeURL, putData) {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(basicUrl + routeURL, putData, { headers })
  }

  apiDelete(routeURL) {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    headers.append('Content-Type', 'application/json');
    return this.httpClient.delete(basicUrl + routeURL, { headers })
  }

  apiPost(routeURL, postData, content_type?) {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    const obj: any = {};
    if (!content_type) {
      headers.append('Content-Type', 'application/json');
    }
    else {
      obj.responseType = 'text';
    }
    obj.headers = headers;
    return this.httpClient.post(basicUrl + routeURL, postData, obj)
  }

}

