  const Quickbooks = require('node-quickbooks');
const validator = require('validator');
const moment =  require('moment')
var date = moment(new Date);


Quickbooks.setOauthVersion('2.0');

exports.getOutstandingAccountPayable = function(req, res) {
  const token = req.user.tokens.find((token) => token.kind === 'quickbooks');
  const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
    token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);

    qbo.reportBalanceSheet({date_macro:'This Fiscal Year'}, function(err, balanceSheetReport) {
    
      /** 
      * date-macro Supported Values: Today, 
      * Yesterday, This Week, Last Week, This Week-to-date,
      * Last Week-to-date, Next Week, Next 4 Weeks, This Month,
      * Last Month, This Month-to-date, Last Month-to-date, Next Month, 
      * This Fiscal Quarter, Last Fiscal Quarter, This Fiscal Quarter-to-date,
      * Last Fiscal Quarter-to-date, Next Fiscal Quarter, This Fiscal Year, Last Fiscal Year, 
      * This Fiscal Year-to-date, Last Fiscal Year-to-date, Next Fiscal Year
      */
     
      const balance = Number(balanceSheetReport.Rows.Row[1].Rows.Row[0].Rows.Row[0].Summary.ColData[0].value);

      let OutStandingAR = balanceSheetReport.Rows.Row[0].Rows.Row[0].Rows.Row[1].Summary.ColData[1].value

      res.send({balance});
  
    });
}

exports.getOutstandingAccountReceivable = function(req, res) {
  const token = req.user.tokens.find((token) => token.kind === 'quickbooks');
  const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
    token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);

    qbo.reportBalanceSheet({date_macro:'This Fiscal Year'}, function(err, balanceSheetReport) {
    
      /** 
      * date-macro Supported Values: Today, 
      * Yesterday, This Week, Last Week, This Week-to-date,
      * Last Week-to-date, Next Week, Next 4 Weeks, This Month,
      * Last Month, This Month-to-date, Last Month-to-date, Next Month, 
      * This Fiscal Quarter, Last Fiscal Quarter, This Fiscal Quarter-to-date,
      * Last Fiscal Quarter-to-date, Next Fiscal Quarter, This Fiscal Year, Last Fiscal Year, 
      * This Fiscal Year-to-date, Last Fiscal Year-to-date, Next Fiscal Year
      */

      let OutStandingAR = balanceSheetReport.Rows.Row[0].Rows.Row[0].Rows.Row[1].Summary.ColData[1].value

      res.send({OutStandingAR});
  
    });
  
  
  
}
// get cash runaway.
exports.getCashRunaway = function(req, res){
  const token = req.user.tokens.find((token) => token.kind === 'quickbooks');
  const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
    token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  const months = date.month(); 
  qbo.reportProfitAndLoss({date_macro:'This Fiscal Year'}, function(err, profitAndLossReport) {

    qbo.reportBalanceSheet({date_macro:'This Fiscal Year'}, function(err, balanceSheetReport) {
    
      /** 
      * date-macro Supported Values: Today, 
      * Yesterday, This Week, Last Week, This Week-to-date,
      * Last Week-to-date, Next Week, Next 4 Weeks, This Month,
      * Last Month, This Month-to-date, Last Month-to-date, Next Month, 
      * This Fiscal Quarter, Last Fiscal Quarter, This Fiscal Quarter-to-date,
      * Last Fiscal Quarter-to-date, Next Fiscal Quarter, This Fiscal Year, Last Fiscal Year, 
      * This Fiscal Year-to-date, Last Fiscal Year-to-date, Next Fiscal Year
      */
     
      const expenses = Number(profitAndLossReport.Rows.Row[3].Summary.ColData[1].value) +
                        Number(profitAndLossReport.Rows.Row[5].Summary.ColData[1].value);
      
                        
      const cashBurnRate = expenses/months;
      console.log({cashBurnRate});
      
      const balance = Number(balanceSheetReport.Rows.Row[0].Summary.ColData[1].value);

      const cashRunaway = balance/cashBurnRate

      res.send({cashRunaway:cashRunaway.toFixed(2), cashBurnRate});
  
    }) 
  });

}

exports.getCustomerList = function(req, res) {
    const token = req.user.tokens.find((token) => token.kind === 'quickbooks');

    const qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET,
      token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  
    // qbo.reportProfitAndLoss((_, accounts) => {
    //   console.log('kuch tou hai daya', JSON.parse(JSON.stringify(accounts.Columns.Column[0].MetaData)));
    //   res.send(accounts)
    // });
    var result = [];
    
    qbo.reportProfitAndLoss((_,callback)=>{
      console.log('Result',callback);
      result.push({result:callback})
      res.status(200).send(callback);
      
    })
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