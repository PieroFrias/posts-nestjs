export interface BaseResponse {
  message: string;
}

export interface FindAllResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CreateResponse<T> extends BaseResponse {
  data: T;
}

export interface UpdateResponse<T> extends CreateResponse<T> {}

export interface ChangeStatusResponse<T> extends UpdateResponse<T> {}

// export interface RemoveResponse extends BaseResponse {}

// export interface RestoreResponse extends BaseResponse {}
