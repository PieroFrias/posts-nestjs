export interface IBaseResponse {
  message: string;
}

export interface IFindAllResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ICreateResponse<T> extends IBaseResponse {
  data: T;
}

export interface IUpdateResponse<T> extends ICreateResponse<T> {}

export interface IChangeStatusResponse<T> extends IUpdateResponse<T> {}

// export interface IRemoveResponse extends IBaseResponse {}

// export interface IRestoreResponse extends IBaseResponse {}
