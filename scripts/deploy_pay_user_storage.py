from brownie import pay_user_storage, accounts

def main():
  acct = accounts.load('test_account')
  pay_user_storage.deploy(2, {'from': acct})
