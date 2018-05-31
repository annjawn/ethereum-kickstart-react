'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//this will initialize a web3 instance with the metamask provider that Metamask injects on the browser
//"window" variable cannot be accessed using Next.js since Next does server side rendering and
//Node JS server has nothing known as "window". window is only available in the browser

var web3 = void 0;

// check if it is browser and if the browser has Metamask installed
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //we are in the browser and metamask is running
  web3 = new _web2.default(window.web3.currentProvider);
} else {
  //We are NOT in the browser OR the user is not runnng Metamask

  //create own provider using Web3
  var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/1UmrEF7w4woWdfq4P83H');

  web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxZQUFKOztBQUVBO0FBQ0EsSUFBSSxPQUFPLEFBQVAsV0FBa0IsQUFBbEIsZUFBaUMsT0FBTyxPQUFPLEFBQWQsU0FBdUIsQUFBNUQsYUFBd0UsQUFDdEU7QUFDQTtTQUFPLEFBQUksQUFBSixrQkFBUyxPQUFPLEFBQVAsS0FBWSxBQUFyQixBQUFQLEFBQ0Q7QUFIRCxPQUdPLEFBQ0w7QUFFQTs7QUFDQTtNQUFNLFdBQVcsSUFBSSxjQUFLLEFBQUwsVUFBZSxBQUFuQixhQUNmLEFBRGUsQUFBakIsQUFJQTs7U0FBTyxBQUFJLEFBQUosa0JBQVMsQUFBVCxBQUFQLEFBQ0Q7QUFFRDs7a0JBQWUsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmphbi9Eb2N1bWVudHMvRXRoZXJldW0vcHJvamVjdHMva2lja3N0YXJ0In0=