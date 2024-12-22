export interface IResponse<T> {
  type: string;
  data: T;
  message: string;
  // meta: IResponseMeta;
  // errors?: any[] | any;
  // status: boolean;
  // errorCode?: number;
}

// export interface IResponseMeta {
//   pagination?: IPagination;
//   accessToken?: string;
//   refreshToken?: string;
// }

// export interface IPagination {
//   pageNumber: number;
//   totalPages: number;
//   pageSize: number;
//   totalItems: number;
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
// }
