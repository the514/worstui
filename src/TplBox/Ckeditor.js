import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CKEditor extends Component {
		constructor(props) {
				super(props);
				this.state = {
						value: props.value || "<p></p>",
						config: {
							height: 300,
							toolbarGroups: [
								{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
								{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
								{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
								{ name: 'forms', groups: [ 'forms' ] },
								{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
								{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
								{ name: 'links', groups: [ 'links' ] },
								{ name: 'insert', groups: [ 'insert' ] },
								{ name: 'colors', groups: [ 'colors' ] },
								{ name: 'styles', groups: [ 'styles' ] },
								{ name: 'tools', groups: [ 'tools' ] },
								{ name: 'about', groups: [ 'about' ] },
								{ name: 'others', groups: [ 'others' ] }
														],
							removeButtons: 'Save,NewPage,Preview,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,CreateDiv,Language,PageBreak,Smiley,ShowBlocks'
						},
						onChange: props.onChange,
						mode: "wysiwyg"
				}

		}

		handleChange() {
			this.state.onChange(this.state.value || "<p></p>");
		}

		componentDidMount(props) {
			if (!window.CKEDITOR) {
				console.error('CKEditor not found');
				return;
			}
			
			this.instance = window.CKEDITOR.appendTo(ReactDOM.findDOMNode(this), this.state.config, this.state.value);

			let thisClass = this;
			// setInterval((function(){
			// 	thisClass.setState({value: thisClass.instance.getData()});
			// 	thisClass.handleChange(thisClass.instance.getData());
			// }), 50);

			this.instance.on('mode', function() {
				// console.log(this.mode);
				thisClass.setState({mode:this.mode});
				thisClass.instance.on('change', (e) => {
					thisClass.setState({value: thisClass.instance.getData()});
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

			if(!this.instance){return}

			this.instance.setData(this.props.value);

			this.setState({
				value: this.state.value
			})

		}

		componentDidUpdate(props){
			// console.log(props.value);
			// console.log(this.instance.getData());
			// console.log('updating', this.state);
		}

		componentWillReceiveProps(props) {
		}

		render() {
			return (<div></div>);
		}
}

export default CKEditor;