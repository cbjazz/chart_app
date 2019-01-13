/*
*ChartGallary
  ---  SerchBarForm
  ---  ChartList
       --- Chart
*/
class ChartGallary extends React.Component {

  /* Query 결과의 StockList 정보를 가지고 있어서, ChartList 에 전달해야 함 */
  constructor(props) {
   super(props);

   this.state = {
     stocks: [],
     showModal: false,
     stockId: '',
   }
  }

/*
  // Function for opening modal dialog
  handleOpenModal = (id) => {
    this.setState({
      showModal: true,
      stock: this.state.stocks.map((stock) => {
        if (stock.id == id) {
          return stock
        } else {
          return {}
        }
      })
    })
  };

  // Function for closing modal dialog
  handleCloseModal = () => {
    this.setState({
      showModal: false,
      stock: ''
    })
  }
*/
  handleSearchSubmit = (searchQuery) => {
    this.loadStockChartFromServer(searchQuery);
  };

  /* 함수를 SearchBarForm 으로 전달해야 함 ???*/
  loadStockChartFromServer = (searchQuery) => {
    client.search({searchQuery:searchQuery}, (serverCharts) => (
      this.setState( {stocks: serverCharts} )
    ));
  };

  render() {
      return (
        <div className='gallary'>
          <div className='search'>
            <SearchBarForm
              onSearchSubmit={this.handleSearchSubmit}/>
            <ChartList
              stocks={this.state.stocks}
              onImageClick={this.handleOpenModal}
            />
            <GalleryModal
              isOpen={this.state.showModal}
              onClick={this.handleCloseModal}
              stockId={this.state.stockId}
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

  render() {
    const stockComponents = this.props.stocks.map((stock) => (
      // JSX component
      //  key 는 React 의 유니크 바인딩을 위한 특별한 프로퍼티...
      <Stock
        key                 = {'stock-' + stock.id}
        id                  = {stock.id}
        title               = {stock.code}
        chart               = {stock.chart}
        onImageClick        = {this.props.onImageClick}
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
            <a href='#' id={this.props.id} onClick={this.props.onImageClick}>{this.props.title}</a>
          </div>
        </div>
      </div>
    );
  }
}

class GalleryModal extends React.Component {
  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div className="ui modal show">
        <i className="close icon"></i>
        <div className="header">
          Profile Picture
        </div>
        <div className="image content">
          <div className="description">
            <div className="ui header">We've auto-chosen a profile image for you.</div>
            <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </div>
        </div>
        <div className="actions">
          <div className="ui black deny button">
            Nope
          </div>
          <div className="ui positive right labeled icon button">
            Yep, that's me
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ChartGallary />,
  document.getElementById('content')
);
