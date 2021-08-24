from brownie import storage, accounts

def main():
  acct = accounts.load('test_account')
  storage.deploy(2, {'from': acct})
