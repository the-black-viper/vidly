import React from "react";
import Joi from "joi";

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const weakRegex = new RegExp("^[a-zA-Z0-9]{3,30}$");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().pattern(strongRegex),
})
  .with("email", "password")
  .xor("password", "access_token");

const passwordSchema = Joi.object({
  password: Joi.string().pattern(strongRegex).required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const nameSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
});

const titleSchema = Joi.object({
  title: Joi.string().alphanum().min(3).required(),
});

const genreSchema = Joi.object({
  genre: Joi.string().alphanum().required(),
});

const rateSchema = Joi.object({
  rate: Joi.number().min(0).max(100).precision(2).required(),
});

const stockSchema = Joi.object({
  stock: Joi.number().min(0).max(100).integer(),
});

const newMovieSchema = Joi.object({
  title: Joi.string().alphanum().min(3).required(),
  genre: Joi.string().alphanum().required(),
  rate: Joi.number().min(0).max(100).precision(2).required(),
  stock: Joi.number().min(0).max(100).integer(),
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().pattern(strongRegex),
})
  .with("email", "password")
  .xor("password", "access_token");
export {
  nameSchema,
  emailSchema,
  passwordSchema,
  loginSchema,
  registerSchema,
  titleSchema,
  rateSchema,
  stockSchema,
  genreSchema,
  newMovieSchema,
};
