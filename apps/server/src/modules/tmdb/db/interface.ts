export interface Database {
  save(data: any): Promise<any>;
  list(): Promise<any>;
}
