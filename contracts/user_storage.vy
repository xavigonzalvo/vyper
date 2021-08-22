# @version ^0.2.0

event DataChange:
    setter: indexed(address)
    value: uint256
stored_data: public(HashMap[address, uint256])

@external
def __init__(_x: uint256):
  self.stored_data[msg.sender] = _x

@external
def set(new_value: uint256):
  self.stored_data[msg.sender] = new_value
  log DataChange(msg.sender, new_value)

@view
@external
def get(user: address) -> uint256:
  return self.stored_data[user]
