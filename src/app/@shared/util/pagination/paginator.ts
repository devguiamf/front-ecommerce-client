export interface PageInitOprionsProps {
  page?: number;
  limit?: number;
}

export class Paginator {

  page: number;
  limit: number;

  constructor(pageInitOpitions: PageInitOprionsProps) {
    this.page = pageInitOpitions.page ?? 1;
    this.limit = pageInitOpitions.limit ?? 10;
  }

  nextPage(){
    this.page++;
  }

  previousPage(){
    this.page--;
  }

  toQueryString(params: any = null): string {
    const stringQueryDefault = `?page=${this.page}&limit=${this.limit}`;
    if(params){
      const keys = Object.keys(params);
      const stringQuery = keys.map(key => {
        return `${key}=${params[key]}`;
      }).join('&');
      return `${stringQueryDefault}&${stringQuery}`;
    }
    return stringQueryDefault;
  }
}

