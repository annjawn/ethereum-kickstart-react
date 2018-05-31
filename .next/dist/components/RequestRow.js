'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/anjan/Documents/Ethereum/projects/kickstart/components/RequestRow.js';


var RequestRow = function (_Component) {
  (0, _inherits3.default)(RequestRow, _Component);

  function RequestRow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestRow.__proto__ || (0, _getPrototypeOf2.default)(RequestRow)).call.apply(_ref, [this].concat(args))), _this), _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              campaign = (0, _campaign2.default)(_this.props.address);
              _context.next = 3;
              return _web2.default.eth.getAccounts();

            case 3:
              accounts = _context.sent;
              _context.next = 6;
              return campaign.methods.approveRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onFinalize = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              campaign = (0, _campaign2.default)(_this.props.address);
              _context2.next = 3;
              return _web2.default.eth.getAccounts();

            case 3:
              accounts = _context2.sent;
              _context2.next = 6;
              return campaign.methods.finalizeRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestRow, [{
    key: 'render',
    value: function render() {
      var Row = _semanticUiReact.Table.Row,
          Cell = _semanticUiReact.Table.Cell;

      var readyToFinalize = this.props.request.approvalCount > this.props.totalApprovers / 2;
      return _react2.default.createElement(Row, { disabled: this.props.request.complete, positive: readyToFinalize && !this.props.request.complete, __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, this.props.id), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, this.props.request.description), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _web2.default.utils.fromWei(this.props.request.value, 'ether')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, this.props.request.recipient), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, this.props.request.approvalCount, '/', this.props.totalApprovers), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, this.props.request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, { color: 'green', basic: true, onClick: this.onApprove, __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, ' Approve')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, this.props.request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, { color: 'red', basic: true, onClick: this.onFinalize, __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, ' Finalize')));
    }
  }]);

  return RequestRow;
}(_react.Component);

exports.default = RequestRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVxdWVzdFJvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRhYmxlIiwiQnV0dG9uIiwid2ViMyIsIkNhbXBhaWduIiwiUmVxdWVzdFJvdyIsIm9uQXBwcm92ZSIsImNhbXBhaWduIiwicHJvcHMiLCJhZGRyZXNzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsIm1ldGhvZHMiLCJhcHByb3ZlUmVxdWVzdCIsImlkIiwic2VuZCIsImZyb20iLCJvbkZpbmFsaXplIiwiZmluYWxpemVSZXF1ZXN0IiwiUm93IiwiQ2VsbCIsInJlYWR5VG9GaW5hbGl6ZSIsInJlcXVlc3QiLCJhcHByb3ZhbENvdW50IiwidG90YWxBcHByb3ZlcnMiLCJjb21wbGV0ZSIsImRlc2NyaXB0aW9uIiwidXRpbHMiLCJmcm9tV2VpIiwidmFsdWUiLCJyZWNpcGllbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFPOztBQUNoQixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFjOzs7Ozs7Ozs7SUFFZixBOzs7Ozs7Ozs7Ozs7Ozs7b05BRUosQSxxRkFBWSxtQkFBQTtvQkFBQTtvRUFBQTtrQkFBQTsyQ0FBQTtpQkFDSjtBQURJLHlCQUNPLHdCQUFTLE1BQUEsQUFBSyxNQURyQixBQUNPLEFBQW9COzhCQUQzQjtxQkFFYSxjQUFBLEFBQUssSUFGbEIsQUFFYSxBQUFTOztpQkFBMUI7QUFGSSxrQ0FBQTs4QkFBQTs4QkFHSixBQUFTLFFBQVQsQUFBaUIsZUFBZSxNQUFBLEFBQUssTUFBckMsQUFBMkMsSUFBM0MsQUFBK0M7c0JBQzdDLFNBSkUsQUFHSixBQUFvRCxBQUNsRCxBQUFTO0FBRHlDLEFBQ3hELGVBREk7O2lCQUhJO2lCQUFBOzhCQUFBOztBQUFBO2tCQUFBO0EsZSxBQVFaLHNGQUFhLG9CQUFBO29CQUFBO3NFQUFBO2tCQUFBOzZDQUFBO2lCQUNMO0FBREsseUJBQ00sd0JBQVMsTUFBQSxBQUFLLE1BRHBCLEFBQ00sQUFBb0I7K0JBRDFCO3FCQUVZLGNBQUEsQUFBSyxJQUZqQixBQUVZLEFBQVM7O2lCQUExQjtBQUZLLG1DQUFBOytCQUFBOzhCQUdMLEFBQVMsUUFBVCxBQUFpQixnQkFBZ0IsTUFBQSxBQUFLLE1BQXRDLEFBQTRDLElBQTVDLEFBQWdEO3NCQUM5QyxTQUpHLEFBR0wsQUFBcUQsQUFDbkQsQUFBUztBQUQwQyxBQUN6RCxlQURJOztpQkFISztpQkFBQTsrQkFBQTs7QUFBQTttQkFBQTtBOzs7Ozs2QkFRSjtVQUFBLEFBQ0EsTUFEQSxBQUNjLHVCQURkLEFBQ0E7VUFEQSxBQUNLLE9BREwsQUFDYyx1QkFEZCxBQUNLLEFBQ1o7O1VBQU0sa0JBQWtCLEtBQUEsQUFBSyxNQUFMLEFBQVcsUUFBWCxBQUFtQixnQkFBZ0IsS0FBQSxBQUFLLE1BQUwsQUFBVyxpQkFBdEUsQUFBdUYsQUFDdkY7NkJBQ0csY0FBRCxPQUFLLFVBQVUsS0FBQSxBQUFLLE1BQUwsQUFBVyxRQUExQixBQUFrQyxVQUFVLFVBQVUsbUJBQW1CLENBQUMsS0FBQSxBQUFLLE1BQUwsQUFBVyxRQUFyRixBQUE2RjtvQkFBN0Y7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0csY0FBRDs7b0JBQUE7c0JBQUEsQUFBTztBQUFQO0FBQUEsY0FBTyxBQUFLLE1BRGQsQUFDRSxBQUFrQixBQUNsQixxQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxjQUFPLEFBQUssTUFBTCxBQUFXLFFBRnBCLEFBRUUsQUFBMEIsQUFDMUIsOEJBQUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFBTztBQUFQO0FBQUEsdUJBQU8sQUFBSyxNQUFMLEFBQVcsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLFFBQTlCLEFBQXNDLE9BSC9DLEFBR0UsQUFBTyxBQUE0QyxBQUNuRCwyQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxjQUFPLEFBQUssTUFBTCxBQUFXLFFBSnBCLEFBSUUsQUFBMEIsQUFDMUIsNEJBQUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFBTztBQUFQO0FBQUEsY0FBTyxBQUFLLE1BQUwsQUFBVyxRQUFsQixBQUEwQixlQUFnQixVQUFBLEFBQUssTUFMakQsQUFLRSxBQUFxRCxBQUNyRCxpQ0FBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNJO0FBREo7QUFBQSxjQUNJLEFBQUssTUFBTCxBQUFXLFFBQVgsQUFBbUIsV0FBbkIsQUFBOEIsdUJBQzVCLEFBQUMseUNBQU8sT0FBUixBQUFjLFNBQVEsT0FBdEIsTUFBNEIsU0FBUyxLQUFyQyxBQUEwQztvQkFBMUM7c0JBQUE7QUFBQTtPQUFBLEVBUlIsQUFNRSxBQUVNLEFBS04sOEJBQUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEsY0FDRSxBQUFLLE1BQUwsQUFBVyxRQUFYLEFBQW1CLFdBQW5CLEFBQThCLHVCQUM1QixBQUFDLHlDQUFPLE9BQVIsQUFBYyxPQUFNLE9BQXBCLE1BQTBCLFNBQVMsS0FBbkMsQUFBd0M7b0JBQXhDO3NCQUFBO0FBQUE7T0FBQSxFQWhCUixBQUNFLEFBYUUsQUFFSSxBQU9UOzs7OztBQTVDc0IsQSxBQStDekI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiUmVxdWVzdFJvdy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYW5qYW4vRG9jdW1lbnRzL0V0aGVyZXVtL3Byb2plY3RzL2tpY2tzdGFydCJ9