# @version ^0.2.0

# stored_data: public(HashMap[address, uint256])
#
# @external
# def set(new_value: uint256):
#   self.stored_data[msg.sender] = new_value
#
# @view
# @external
# def get() -> uint256:
#   return self.stored_data[msg.sender]


stored_data: public(uint256)

@external
def __init__(_x: uint256):
  self.stored_data = _x

@external
def set(new_value: uint256):
  self.stored_data = new_value

@view
@external
def get() -> uint256:
  return self.stored_data
