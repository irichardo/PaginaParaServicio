import { IController, IRequest, IResponse } from "../controller.interface";
import { Request, Response } from "express";

const ExpressRouterAdapter =
  (controller: IController<any>) => async (req: Request, res: Response) => {
    const request: IRequest<any> = {
      payload: req.body,
      params: req.params,
      query: req.query,
    };

    try {
      const response: IResponse = await controller.handle(request);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default ExpressRouterAdapter;
