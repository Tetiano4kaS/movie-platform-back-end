import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors/ApiError";

class MovieMiddleware {
  public async findByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError("Movie ID is required", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        req.body = await validator.validateAsync(req.body, {
          stripUnknown: true,
        });
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isQueryValid(validator: ObjectSchema) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
      try {
        req.query = await validator.validateAsync(req.query, {
          stripUnknown: true,
        });
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const movieMiddleware = new MovieMiddleware();
