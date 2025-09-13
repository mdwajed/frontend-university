export type TMeta = {
  total: number;
  limit: number;
  page: number;
};

export type APIError = {
  errorMessages: any;
  status?: string;
  data?: {
    message?: string;
    success?: string;
    errorMessages?: { path: string; message: string }[];
  };

  message?: string;
  success?: boolean;
};

export type FilterArg = { name: string; value: string }[];

export type TQueryParam = {
  name: string;
  value: string;
};
