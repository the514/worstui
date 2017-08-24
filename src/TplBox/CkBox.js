import React, { Component } from 'react';
import CKEditor from './Ckeditor';
// import $ from 'jquery';


class CkBox extends Component {
		constructor(props) {
			super(props);

			const value = props.value || "<p></p>";
			this.state = {
				value: value,
				html: "<p></p>"
			}

			this.handleChange = this.handleChange.bind(this);

		}

		handleChange(value) {
			// console.log(value);
			this.triggerChange(value);
		}

		componentDidMount(props) {
			// console.log(this.state.value);
		}

	  triggerChange = (changeValue) => {
	    // Should provide an event to pass value to Form.
	    const onChange = this.props.onChange;
	    if (onChange) {
	      onChange(Object.assign(changeValue));
	    }
	  }

		componentDidUpdate(props){
		}

		componentWillReceiveProps(nextProps) {
		}

		render() {
			return (
				<div>
					<CKEditor onChange={this.handleChange} value={this.props.value} />
				</div>
			);
		}
}


export default CkBox;