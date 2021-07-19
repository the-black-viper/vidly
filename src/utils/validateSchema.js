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
  password: Joi.string().min(3).max(100),
})
  .with("email", "password")
  .xor("password", "access_token");

const loginPasswordSchema = Joi.object({
  password: Joi.string().min(3).max(100),
});

const passwordSchema = Joi.object({
  password: Joi.string().pattern(strongRegex).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const usernameSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
});

const newMovieSchema = Joi.object({
  id: Joi.string().optional(),
  _id: Joi.string().alphanum(),
  title: Joi.string().alphanum().min(5),
  genreId: Joi.string().alphanum(),
  dailyRentalRate: Joi.number().min(0).max(100).precision(2),
  numberInStock: Joi.number().min(0).max(100).integer(),
  publishDate: Joi.date().optional(),
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(strongRegex),
});

export {
  usernameSchema,
  emailSchema,
  passwordSchema,
  loginPasswordSchema,
  loginSchema,
  registerSchema,
  newMovieSchema,
};
