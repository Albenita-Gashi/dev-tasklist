const Joi = require('joi');

const BookingSchema = Joi.object({
    service: Joi.string().required(),
    doctor_name: Joi.string().required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    date: Joi.date().required()
}).options({ allowUnknown: true });

module.exports = BookingSchema