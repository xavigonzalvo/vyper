import pytest

INITIAL_VALUE = 4


@pytest.fixture
def storage_contract(pay_user_storage, accounts):
    # deploy the contract with the initial value as a constructor argument
    yield pay_user_storage.deploy(INITIAL_VALUE, {'from': accounts[0]})


def test_initial_state(storage_contract, accounts):
    # Check if the constructor of the contract is set up properly
    assert storage_contract.stored_data(accounts[0]) == INITIAL_VALUE


def test_get(storage_contract, accounts):
    assert storage_contract.get(accounts[0]) == INITIAL_VALUE


def test_set(storage_contract, accounts):
    # set the value to 10
    tx = storage_contract.set(13)
    assert storage_contract.stored_data(accounts[0]) == 13

    assert len(tx.events) == 1
    assert tx.events[0]['value'] == 13
    assert tx.events[0]['setter'] == accounts[0]


def test_pay(storage_contract, accounts):
    storage_contract.pay(accounts[1])
