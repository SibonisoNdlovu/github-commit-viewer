import React from 'react';
import './SearchBox.css'

class SearchBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			term: '',
      findRepo: props.findRepo
		}
	}


  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.findRepo(event,this.state.term, true);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <input className='input1'
              type="text"
              value={this.state.term}
              onChange={this.onInputChange}
			        placeholder="     E.g. facebook/react" 
            /> {''}
            <button className='button1'>See commits</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
