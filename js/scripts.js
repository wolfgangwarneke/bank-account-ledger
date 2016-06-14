// Helper function to deal with problems with float //
var processNumber = function(number) {
  return (Math.round(number * 100)) / 100;
};

function Account(username, initialdeposit, type) {
  this.accountHolder = [username];
  this.balance = 0;
  this.accountType = type;
  this.transactionLog = [];

  this.accountTransaction(initialdeposit, "First deposit. Welcome!");
};

Account.prototype.accountTransaction = function(amount, comment) {
  var deposit = new Transaction(amount, comment);
  this.transactionLog.push(deposit);
  this.balance += amount;
  this.balance = processNumber(this.balance);
  if (this.balance < 0 && this.transactionLog[this.transactionLog.length - 1].comment != "Overdraft fee") {
    this.accountTransaction(-20, "Overdraft fee");
  }
};

function Transaction(amount, comment) {
  this.amount = amount;
  this.comment = comment;
  this.time = new Date();
};



var accountOne = new Account("John Doe", 30000, "savings");


$(function() {
  Account.prototype.updateLedger = function() {
    $('#ledger').empty();
    var ledgerBalance = 0;
    this.transactionLog.forEach(function(transaction) {
      console.log('works');
      ledgerBalance += transaction.amount;
      $('#ledger').prepend('<tr><td>' + transaction.amount + '</td><td>' + transaction.comment + '</td><td>' + transaction.time + '</td><td>' + processNumber(ledgerBalance) + '</td></tr>');
    });
  };

  accountOne.updateLedger();

  $('#deposit').click(function() {
    if (parseFloat($('#transaction-amount').val()) && parseFloat($('#transaction-amount').val()) >= 0) {
      accountOne.accountTransaction( parseFloat(parseFloat($('#transaction-amount').val()).toFixed(2)), $('#transaction-comment').val() );
      accountOne.updateLedger();
      document.getElementById("transaction-form").reset();
    } else {
      alert("Please enter a positive number.");
    }
  });

  $('#withdrawal').click(function() {
    if (parseFloat($('#transaction-amount').val()) && parseFloat($('#transaction-amount').val()) >= 0) {
      accountOne.accountTransaction( -parseFloat(parseFloat($('#transaction-amount').val()).toFixed(2)), $('#transaction-comment').val() );
      accountOne.updateLedger();
      document.getElementById("transaction-form").reset();
    } else {
      alert("Please enter a positive number.");
    }
  });
});
