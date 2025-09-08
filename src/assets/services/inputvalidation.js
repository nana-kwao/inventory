import Joi from "joi";

//signup
const signupValidationSchema = Joi.object({
  business: Joi.string().min(2).required().messages({
    "string.min": "Business name must be at least 2 characters long",
    "string.empty": "Business name cannot be empty",
  }),
  name: Joi.string().min(2).required().messages({
    "string.min": "User name must be at least 2 characters long",
    "string.empty": "User name cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  phone: Joi.string()
    .min(10)
    .max(13)
    .required()
    .messages({
      "string.min": "Mobile number cannot be less than 10",
      "string.max": "Mobile number cannot be more than 10",
      "string.empty": "Mobile number cannot be empty",
    })
    .regex(/^(?:\+233|0)\d{9}$/)
    .messages({ "string.pattern.base": "Telephone example format 0234567890" }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.empty": "Password is required.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*()?&]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

//forgot email
const forgotPasswordValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
});

//reset password
const resetPasswordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.empty": "Password is required.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*()?&]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

//login
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.empty": "Password is required.",
  }),
});

//product
const productValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "string.empty": "Product name cannot be empty" }),
  creator: Joi.string()
    .length(24)
    .required()
    .messages({ "string.empty": "User name cannot be empty" }),
  sell_price: Joi.string()
    .min(2)
    .required()
    .messages({ "string.empty": "Selling price cannot be empty" }),
  buy_price: Joi.string()
    .min(2)
    .messages({ "string.min": "Buy price must be at least 2 characters long" }),
  total_quantity: Joi.number()
    .min(1)
    .required()
    .messages({ "number.empty": "Total Quantity must be more than 0" }),
});

//stock
const stockValidationSchema = Joi.object({
  product: Joi.string()
    .length(24)
    .required()
    .messages({ "string.empty": "Product name cannot be empty" }),
  creator: Joi.string()
    .length(24)
    .required()
    .messages({ "string.empty": "User name cannot be empty" }),
  added_quantity: Joi.number()
    .min(1)
    .required()
    .messages({ "number.empty": "Added Quantity must be more than 0" }),
});

//order
const orderValidationSchema = Joi.object({
  product: Joi.string()
    .length(24)
    .required()
    .messages({ "string.empty": "Product name cannot be empty" }),
  creator: Joi.string()
    .length(24)
    .required()
    .messages({ "string.empty": "User name cannot be empty" }),
  customer: Joi.string()
    .min(2)
    .required()
    .messages({ "string.empty": "Customer name cannot be empty" }),
  payment_mode: Joi.string()
    .valid("cash", "momo", "bank", "card")
    .required()
    .messages({
      "string.valid": "Payment must be either 'cash', 'momo','bank' or 'card'.",
      "string.empty": "Payment is required",
    }),
  sold_quantity: Joi.number()
    .min(1)
    .required()
    .messages({ "number.empty": "Sold Quantity must be more than 0" }),
});
export {
  signupValidationSchema,
  resetPasswordValidationSchema,
  forgotPasswordValidationSchema,
  loginValidationSchema,
  productValidationSchema,
  stockValidationSchema,
  orderValidationSchema,
};
