const Quickbooks = require('node-quickbooks');
const validator = require('validator');

Quickbooks.setOauthVersion('2.0');
// Display list of all Genre.
exports.getCustomerList = function(req, res) {
    const token = req.user.tokens.find((token) => token.kind === 'quickbooks');

    const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
      token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  
    // qbo.reportProfitAndLoss((_, accounts) => {
    //   console.log('kuch tou hai daya', JSON.parse(JSON.stringify(accounts.Columns.Column[0].MetaData)));
    //   res.send(accounts)
    // });
    var result = [];
    // qbo.findCustomers((_, customers) => {
    //   res.render('api/quickbooks', {
    //     title: 'Quickbooks API',
    //     customers: customers.QueryResponse.Customer
    //   });
    // });
    // qbo.reportBalanceSheet((_,callback)=>{
    //   console.log('Result',callback);
    //   res.status(200).send(callback);
    //   // result.push({result:callback})
      
    // })
    qbo.reportProfitAndLoss((_,callback)=>{
      console.log('Result',callback);
      result.push({result:callback})
      res.status(200).send(callback);
      
    })
    // qbo.reportProfitAndLossDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportTrialBalance((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportCashFlow((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportInventoryValuationSummary((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportCustomerSales((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportItemSales((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportCustomerIncome((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportCustomerBalance((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportCustomerBalanceDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportAgedReceivables((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportAgedReceivableDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportVendorBalance((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportVendorBalanceDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportAgedPayables((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportAgedPayableDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportVendorExpenses((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportTransactionList((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportGeneralLedgerDetail((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportDepartmentSales((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
      
    // })
    // qbo.reportClassSales((_,callback)=>{
    //   console.log('Result',callback);
    //   result.push({result:callback})
    // })
    // res.send('api/quickbooks', result);
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