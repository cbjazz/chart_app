import React from 'react';
import {Icon, Button, Input} from 'semantic-ui-react';

class SearchBarForm extends React.Component {
  /* Search 에 대한 이벤트 핸들러 만들어야 함. (Enter 키 입력, search icon 클릭) */
  state = {
    searchQuery : '',
  };

  handleSearchQueryChange = (e) => {
    this.setState( { searchQuery: e.target.value });
  };

  handleKeyPress = (e)  => {
    if (e.key === 'Enter') {
      this.props.onSearchSubmit(this.state.searchQuery);
    }
  };

  handleSearchSubmit = () => {
    this.props.onSearchSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <Input fluid placeholder="Search...">
        <input
          onChange={this.handleSearchQueryChange}
          onKeyPress={this.handleKeyPress}/>
        <Button icon type='submit'
          onClick={this.handleSearchSubmit} >
          <Icon name='search'/>
        </Button>
      </Input>
    );
  }
}

export default SearchBarForm
