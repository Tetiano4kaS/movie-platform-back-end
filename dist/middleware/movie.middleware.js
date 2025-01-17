"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieMiddleware = void 0;
const ApiError_1 = require("../errors/ApiError");
class MovieMiddleware {
    async findByIdOrThrow(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError_1.ApiError("Movie ID is required", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isBodyValid(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body, {
                    stripUnknown: true,
                });
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isQueryValid(validator) {
        return async (req, res, next) => {
            try {
                req.query = await validator.validateAsync(req.query, {
                    stripUnknown: true,
                });
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.movieMiddleware = new MovieMiddleware();
