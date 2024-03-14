const Joi = require('joi');

const BookingSchema = Joi.object({
    service: Joi.string().required()
    .label("Service"),
    doctor_name: Joi.string().required()
    .label("Doctor Name"),
    start_time: Joi.string().required()
    .label("Start Time"),
    end_time: Joi.string().required()
    .label("End Time"),
    date: Joi.date().required()
    .label("Date")
}).options({ allowUnknown: true });

module.exports = BookingSchema