import React from 'react';
import { Container, Menu, Image, Dropdown, Grid } from 'semantic-ui-react';

import SearchBarForm from './SearchBar'
import ChartList from './ChartItemList'
import ChartCard from './ChartItemCard'
import ToolBar from './ToolBar'

const client = (function() {
    function search(data, success) {
      return fetch('http://localhost:5000/search', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type' : 'application/json',
          'Allow-Control-Allow-Origin' : '*',
          'mode' : 'no-cors'
        },
      }).then(checkStatus)
        .then(parseJSON)
        .then(success);
    }

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
      }
    }

    function parseJSON(response) {
      return response.json()
    }

    return{
      search,
    };
}());



class ChartGallery extends React.Component {

  constructor(props) {
   super(props);

   this.state = {
     stocks: [],
     showOption: 'list',
    }
  };

  handleSearchSubmit = (searchQuery) => {
    this.loadStockChartFromServer(searchQuery);
  };

  /* 함수를 SearchBarForm 으로 전달해야 함 ???*/
  loadStockChartFromServer = (searchQuery) => {
    client.search({searchQuery:searchQuery}, (serverCharts) => {
      this.setState( {stocks: serverCharts} )
    });
  };

  handleViewOption = (opt) => {
    this.setState( {showOpion:opt} )
  };

  render_view() {
    if (this.state.showOpion === 'list') {
      return <ChartList
        stocks={this.state.stocks}
      />
    } else {
      return <ChartCard
        stocks={this.state.stocks}
      />
    }
  }


  render() {

      return (
          <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                GPDB ChartGallery
              </Menu.Item>
              <Menu.Item as='a'>Home</Menu.Item>

              <Dropdown item simple text='Dropdown'>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Header Item</Dropdown.Header>
                  <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                      <Dropdown.Item>List Item</Dropdown.Item>
                      <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Menu>
          <Container width={16} style={{ margin: '7em 1.5em 1.5em' }}>
            <Grid columns={2}>
              <Grid.Column widht={12}>
                <SearchBarForm
                  onSearchSubmit={this.handleSearchSubmit}/>
              </Grid.Column>
              <Grid.Column width={4} floated='right'>
                <ToolBar
                  onOptionClick={this.handleViewOption} />
              </Grid.Column>
            </Grid>
            {this.render_view(this.state.showOption)}
          </Container>
        </div>
      )
  }
}

export default ChartGallery;
