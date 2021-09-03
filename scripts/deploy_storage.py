from brownie import storage, accounts

def main():
  acct = accounts[0]
  storage.deploy(2, {'from': acct})
