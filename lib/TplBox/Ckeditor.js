'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CKEditor = function (_Component) {
	_inherits(CKEditor, _Component);

	function CKEditor(props) {
		_classCallCheck(this, CKEditor);

		var _this = _possibleConstructorReturn(this, (CKEditor.__proto__ || Object.getPrototypeOf(CKEditor)).call(this, props));

		_this.state = {
			value: props.value || "<p></p>",
			config: {
				height: 300,
				toolbarGroups: [{ name: 'document', groups: ['mode', 'document', 'doctools'] }, { name: 'clipboard', groups: ['clipboard', 'undo'] }, { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] }, { name: 'forms', groups: ['forms'] }, { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] }, { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] }, { name: 'links', groups: ['links'] }, { name: 'insert', groups: ['insert'] }, { name: 'colors', groups: ['colors'] }, { name: 'styles', groups: ['styles'] }, { name: 'tools', groups: ['tools'] }, { name: 'about', groups: ['about'] }, { name: 'others', groups: ['others'] }],
				removeButtons: 'Save,NewPage,Preview,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,CreateDiv,Language,PageBreak,Smiley,ShowBlocks'
			},
			onChange: props.onChange,
			mode: "wysiwyg"
		};

		return _this;
	}

	_createClass(CKEditor, [{
		key: 'handleChange',
		value: function handleChange() {
			this.state.onChange(this.state.value || "<p></p>");
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount(props) {
			if (!window.CKEDITOR) {
				console.error('CKEditor not found');
				return;
			}

			this.instance = window.CKEDITOR.appendTo(_reactDom2.default.findDOMNode(this), this.state.config, this.state.value);

			var thisClass = this;
			// setInterval((function(){
			// 	thisClass.setState({value: thisClass.instance.getData()});
			// 	thisClass.handleChange(thisClass.instance.getData());
			// }), 50);

			this.instance.on('mode', function () {
				// console.log(this.mode);
				thisClass.setState({ mode: this.mode });
				thisClass.instance.on('change', function (e) {
					thisClass.setState({ value: thisClass.instance.getData() });
					thisClass.handleChange(thisClass.instance.getData());
				});

				// if (this.mode === "wysiwyg") {
				// 	thisClass.instance.on('change', (e) => {
				// 		thisClass.handleChange(thisClass.instance.getData());
				// 		if (thisClass.instance.getData()!=="") {
				// 			thisClass.setState({value: thisClass.instance.getData()});
				// 			thisClass.handleChange();
				// 		}else {
				// 			thisClass.setState({value: "<p></p>"});
				// 			thisClass.handleChange();
				// 		}
				// 	});
				// }else if (this.mode === "source") {
				// 	thisClass.instance.on('key', (e) => {
				// 		thisClass.handleChange(thisClass.instance.getData());
				// 		if (thisClass.instance.getData()!=="") {
				// 			thisClass.setState({value: thisClass.instance.getData()});
				// 			thisClass.handleChange();
				// 		}else {
				// 			thisClass.setState({value: "<p></p>"});
				// 			thisClass.handleChange();
				// 		}
				// 	});
				// }
			});

			if (!this.instance) {
				return;
			}

			this.instance.setData(this.props.value);

			this.setState({
				value: this.state.value
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(props) {
			// console.log(props.value);
			// console.log(this.instance.getData());
			// console.log('updating', this.state);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', null);
		}
	}]);

	return CKEditor;
}(_react.Component);

exports.default = CKEditor;