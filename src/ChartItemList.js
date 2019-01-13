import React from 'react'
import { Item, Label, Button } from 'semantic-ui-react'

import DetailChartModal from './DetailChartModal'

class ChartList extends React.Component {

  render() {
    const stockComponents = this.props.stocks.map((stock) => (
      // JSX component
      //  key 는 React 의 유니크 바인딩을 위한 특별한 프로퍼티...
      <Stock
        key                 = {'stock-' + stock.id}
        id                  = {stock.id}
        title               = {stock.code}
        name                = {stock.name}
        ko_name             = {stock.ko_name}
        tag                 = {stock.tag}
        chart               = {stock.chart}
        onImageClick        = {this.props.onImageClick}
      />
    ));

    //"Product" 클래스에 대한 리스트를 리턴한다.
    return (
      <Item.Group>
        {stockComponents}
      </Item.Group>
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
      <Item>>
          <Item.Image size='big' src={"data:image/png;base64," + this.props.chart}/>
          <Item.Content>
            <Item.Header> {this.props.title} </Item.Header>
            <Item.Description>
              <p>{this.props.name}</p>
              <p>{this.props.ko_name}</p>
              <Label as='a' tag>
                  {this.props.tag}
               </Label>
            </Item.Description>
            <Item.Extra>
              <DetailChartModal stock = {this.props}/>
              <Button
                content='Like'
                icon='heart'
                color='green'
                size='mini'
                label={{ as: 'a', basic: true, content: '2,048' }}
                labelPosition='right'
              />
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

export default ChartList;
