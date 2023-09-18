export type IRequest<T> = {
    payload: T;
    params: T;
    query: T;
}

export type IResponse = {
    status: number;
    payload: any;
}

export interface IController<T> {
    handle(req:IRequest<T>):Promise<IResponse>;
}