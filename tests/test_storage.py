import pytest

INITIAL_VALUE = 4


@pytest.fixture
def storage_contract(storage, accounts):
    # deploy the contract with the initial value as a constructor argument
    yield storage.deploy(INITIAL_VALUE, {'from': accounts[0]})


def test_initial_state(storage_contract):
    # Check if the constructor of the contract is set up properly
    assert storage_contract.stored_data() == INITIAL_VALUE


def test_set(storage_contract, accounts):
    # set the value to 10
    storage_contract.set(10, {'from': accounts[0]})
    assert storage_contract.stored_data() == 10
