'use strict'

const router = require('express-promise-router')()

const billings = require('../controllers/billings')
const validate = require('../middleware/validate')
const authenticate = require('../middleware/authenticate')
const { billingValidation, filterBillingsValidation } = require('../utils/validations')

router.get('/', authenticate, billings.getBillingsByUser)
router.post('/', authenticate, validate(billingValidation), billings.createBilling)
router.put('/:id', authenticate, validate(billingValidation), billings.updateBilling)
router.delete('/:id', authenticate, billings.deleteBilling)
router.get('/filter', authenticate, validate(filterBillingsValidation), billings.filterBillings)

module.exports = router
