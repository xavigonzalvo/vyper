App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },
  initWeb3: function() {
    if (typeof web3 != 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },
  initContract: function() {
    $.when(
      $.getJSON("../build/deployments/map.json", data => {
        for (const [id, deployments] of Object.entries(data)) {
          const address = deployments.pay_user_storage[deployments.storage.length - 1];
          const contractJson = `../build/deployments/${id}/${address}.json`;
          $.getJSON(contractJson, data => {
            App.contracts.Pay = new web3.eth.Contract(data.abi, address)
          })
        }
      })
    ).then(function() {
      App.run();
    })
  },
  run: function() {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      // Storage.
      $('#currentAddress').text(account);
      App.get();
      $(document).on('click', '#getValue', App.get);
      $(document).on('click', '#setValue', App.set);
      // Payment.
      $(document).on('click', '#pay', App.pay);
    })
  },
  get: function(event) {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Pay.methods.get(account).call((err, result) => {
        $('#currentValue').text(result);
      })
    })
  },
  set: function(event) {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      const newValue = $('#newValue').val();
      App.contracts.Pay.methods.set(newValue).send({from: account}, (err, result) => {
        if (err) {
          console.error(err);
        }
      })
    })
  },
  pay: function() {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      const amount = $('#payAmount').val();
      const toAddress = $('#toAddress').val();
      App.contracts.Pay.methods.pay(toAddress).send(
          {from: account,
           value: web3.utils.toWei(amount, 'ether')}, (err, result) => {
        if (err) {
          console.error(err);
        }
      })
    })
  },
}

$(window).on('load', function () {
  App.init();
});
