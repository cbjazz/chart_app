import React from 'react'
import { Card, Image, Label, Button } from 'semantic-ui-react'

import DetailChartModal from './DetailChartModal'

class ChartCard extends React.Component {

  render() {
    const stockComponents = this.props.stocks.map((stock) => (
      // JSX component
      //  key 는 React 의 유니크 바인딩을 위한 특별한 프로퍼티...
      <StockCard
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
      <Card.Group itemsPerRow={4}>
        {stockComponents}
      </Card.Group>
    );
  }
}

// "props"는 부모 component 의 변수를 가져올 때 사용한다.
class StockCard extends React.Component {
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
      <Card>
        <Image size='medium' src={"data:image/png;base64," + this.props.chart}/>
        <Card.Content>
            <Card.Header> {this.props.title} </Card.Header>
            <Label as='a' size='tiny' tag>
                {this.props.tag}
             </Label>
        </Card.Content>
        <Card.Content extra>
          <DetailChartModal stock = {this.props}/>
          <Button size='mini' icon='heart' color='green'/>
        </Card.Content>
      </Card>
    );
  }
}

export default ChartCard;
