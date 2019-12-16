const Quickbooks = require('node-quickbooks');
const validator = require('validator');
const moment =  require('moment')
var date = moment(new Date);

Quickbooks.setOauthVersion('2.0');

exports.dashboardData = function(req, res) {
    const token = req.user.tokens.find((token) => token.kind === 'quickbooks');
    const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
    token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
    let data = {};
    qbo.findInvoices([
      {field:"DueDate",value: moment().format("YYYY-MM-DD"),operator:'<'},
      {field: 'Balance', value: '0', operator:'>'}], function(err, invoices){
        console.log('Status1',invoices.QueryResponse.Invoice.map(el=>el.Balance).reduce((ac, cur) => ac + cur));
        data.totalValueoverDue = Math.floor(invoices.QueryResponse.Invoice.map(el=>el.Balance).reduce((ac, cur) => ac + cur))
        qbo.findInvoices([{field: 'Balance', value: '0', operator:'>'}], function(err, invoices){
          data.accountReceivable  = invoices.QueryResponse.Invoice.map(el=>el.Balance).reduce((ac, cur) => ac + cur);
          data.customerAveragePayDays = 20;
          data.YourAveragePayDays = 10;
          res.render('accounting/dashboard', {
            title: 'Accounts',
            data
          });
        });
        
    });
}
