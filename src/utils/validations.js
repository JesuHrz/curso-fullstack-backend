'use strict'

const { object, string, number, mixed } = require('yup')

const emailAndPasswordValidation = object({
  email: string()
    .email('Email invalid.')
    .required('Email is required.'),
  password: string()
    .min(8, 'Password is a very short.')
    .required('Password is required.')
})

const signInValidation = object({
  body: emailAndPasswordValidation
})

const signUpValidation = object({
  body: emailAndPasswordValidation.shape({
    name: string().required('Name is required.')
  })
})

const billingValidation = object({
  body: object({
    name: string().required('Name is required.'),
    description: string().optional(),
    dateOfPaid: string().required('Date of paid is required.'),
    price: number().positive().integer().required('Price is required.')
  })
})

const filterBillingsValidation = object({
  query: object({
    type: mixed().oneOf(['date', 'price']).required('type is required.'),
    value: string().required('Value is required.')
  })
})

module.exports = {
  emailAndPasswordValidation,
  signInValidation,
  signUpValidation,
  billingValidation,
  filterBillingsValidation
}
