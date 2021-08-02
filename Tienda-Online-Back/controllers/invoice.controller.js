'use strict';

const invoiceModel = require('../models/invoice.model');

async function getInvoices(req, res) {
  let userId = req.user.sub;

  try {
    const invoices = await invoiceModel.find({ user: userId });
    return res.status(200).send(invoices);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

/* Export */

module.exports = {
  getInvoices,
};
