from brownie import pay_user_storage, accounts

def main():
  acct = accounts[0]
  pay_user_storage.deploy(2, {'from': acct})
