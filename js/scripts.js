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
};


function Transaction(amount, comment) {
  this.amount = amount;
  this.comment = comment;
  this.time = new Date();
};
