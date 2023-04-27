import Joi from 'joi'

export const categoryNameSchema = Joi.object({
    name:Joi.string().min(2).max(15).required()
    .messages({
        'string.min': 'category name: name must be at least {{#limit}} characters long',
        'string.max': 'category name: name must be at most {{#limit}} characters long',
        'any.required': 'category name: name is required'})
})

export const categoryIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
    .messages({
        'string.hex': 'category ID: id must be a hexadecimal string',
        'string.length': 'category ID: id must be exactly {{#limit}} characters long',
        'any.required': 'category ID: id is required'
    })
})

export const categoryUpdateSchema = Joi.object({
    name:Joi.string().min(2).max(15).required()
    .messages({
        'string.min': 'category name: name must be at least {{#limit}} characters long',
        'string.max': 'category name: name must be at most {{#limit}} characters long',
        'any.required': 'category name: name is required'}),
        
    id:Joi.string().hex().length(24).required()
    .messages({
        'string.hex': 'category ID: id must be a hexadecimal string',
        'string.length': 'category ID: id must be exactly {{#limit}} characters long',
        'any.required': 'category ID: id is required'
    })
})



