'use strict'

const router = require('express-promise-router')()

const auth = require('../controllers/auth')
const validate = require('../middleware/validate')
const { signInValidation, signUpValidation } = require('../utils/validations')

router.post('/sign-in', validate(signInValidation), auth.signIn)
router.post('/sign-up', validate(signUpValidation), auth.signUp)

module.exports = router
