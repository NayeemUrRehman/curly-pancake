const Quickbooks = require('node-quickbooks');
const validator = require('validator');

Quickbooks.setOauthVersion('2.0');
// Display list of all Genre.
exports.getCustomerList = function(req, res) {
    const token = req.user.tokens.find((token) => token.kind === 'quickbooks');

    const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
      token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  
    qbo.reportProfitAndLoss((_, accounts) => {
      console.log('kuch tou hai daya', JSON.parse(JSON.stringify(accounts.Columns.Column[0].MetaData)));
      res.send(accounts)
    });
    // qbo.findCustomers((_, customers) => {
    //   res.render('api/quickbooks', {
    //     title: 'Quickbooks API',
    //     customers: customers.QueryResponse.Customer
    //   });
    // });
};

exports.getAccounts = function(req, res){
  const token = req.user.tokens.find((token) => token.kind === 'quickbooks');

    const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
      token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  
    qbo.reportProfitAndLoss((_, accounts) => {
      console.log('kuch tou hai daya', accounts.QueryResponse);
    });
}

// Display detail page for a specific Genre.
exports.getCustomerDetails = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};