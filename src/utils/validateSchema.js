import React from "react";
import Joi from "joi";

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const weakRegex = new RegExp("^[a-zA-Z0-9]{3,30}$");
const combinedSchema = Joi.object({
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

// const JoiValidate = () => {
//   const result = schema.validate({
//     email: "abcde@gmail.com",
//     password: "h1FXaxdff!",
//   });
//   console.log(result);
//   console.log(Object.keys(result).includes("error"));
//   return <h4 key="joi">JoiTEST</h4>;
// };

const passwordSchema = Joi.object({
  email: Joi.string().optional(),
  password: Joi.string().pattern(strongRegex).required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  // password: Joi.string().optional(),
});

export { emailSchema, passwordSchema };
export default combinedSchema;
