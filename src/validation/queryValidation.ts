import Joi from "joi";

export const QueryValidator = Joi.object({
    title: Joi.string().optional(),
    genre: Joi.string().optional(),
    rating: Joi.number().min(0).max(10).optional(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
});

