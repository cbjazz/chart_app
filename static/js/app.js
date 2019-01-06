/*
*ChartGallary
  ---  SerchBarForm
  ---  ChartList
       --- Chart
*/
class ChartGallary extends React.Component {

  /* Query 결과의 StockList 정보를 가지고 있어서, ChartList 에 전달해야 함 ???*/
  state = {
    stocks: [],
  }

  /* 함수를 SearchBarForm 으로 전달해야 함 ???*/
  loadStockChartFromServer = (searchQuery) => {
    client.search({searchQuery:searchQuery}, (serverCharts) => (
      this.setState( {stocks: serverCharts} )
    ));
  };

  handleSearchSubmit = (searchQuery) => {
    this.loadStockChartFromServer(searchQuery);
  };

  render() {
      return (
        <div className='gallary'>
          <div className='search'>
            <SearchBarForm
              onSearchSubmit={this.handleSearchSubmit}/>
            <ChartList
              stocks = {this.state.stocks}
            />
          </div>
          <div className='contents'>
          </div>
        </div>
      )
  }
}

/*
ChartGallary
  ---  *SerchBarForm
  ---  ChartList
       --- Chart
*/
class SearchBarForm extends React.Component {
  /* Search 에 대한 이벤트 핸들러 만들어야 함. (Enter 키 입력, search icon 클릭) */
  state = {
    searchQuery : '',
  };

  handleSearchQueryChange = (e) => {
    this.setState( { searchQuery: e.target.value });
  };
  /*
  handleKeyPress = (e)  => {
    if (e.key === 'Enter') {
      this.props.onSearchSubmit(this.state.searchQuery);
    }
  };
  */
  handleSearchSubmit = () => {
    this.props.onSearchSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <div className='ui form'>
        <div className='ui big icon fluid input focus'>
          <i className="circular search link icon"
            onClick={this.handleSearchSubmit}>
          </i>
          <input type='text'
                className='input'
                id='search_text'
                placeholder="Search..."
                onChange={this.handleSearchQueryChange}
                onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
  }
}

class ChartList extends React.Component {
  /* Do not need constructor ...
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }
  */
  render() {
    console.log(this.props.stocks)
    const stockComponents = this.props.stocks.map((stock) => (
      // JSX component
      //  key 는 React 의 유니크 바인딩을 위한 특별한 프로퍼티...
      <Stock
        key                 = {'stock-' + stock.id}
        id                  = {stock.id}
        title               = {stock.code}
        chart               = {stock.chart}
      />
    ));

    //"Product" 클래스에 대한 리스트를 리턴한다.
    return (
        <div className='ui unstackable items'>
          {stockComponents}
        </div>
    );
  }
}

// "props"는 부모 component 의 변수를 가져올 때 사용한다.
class Stock extends React.Component {
  /* Do not need constructor ...
  constructor(props) {
    super(props);

    //binding this in funtion
    this.handleUpVote = this.handleUpVote.bind(this);
  }
  <img src={{uri: `data:image/png;base64,${this.props.chart}`}} />
  */

  render() {
    return (
      <div className='item'>
        <div className="ui large image">
          <img  src={"data:image/png;base64," + this.props.chart}/>
        </div>
        <div className='middle aligned content'>
          <div className='description'>
            <a href='#'>{this.props.title}</a>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <ChartGallary />,
  document.getElementById('content')
);
