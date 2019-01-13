import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ToolBar extends React.Component {

  handleCardClick = (e) => {
    this.props.onOptionClick('card');
  };

  handleListClick = (e) => {
    this.props.onOptionClick('list');
  };

  render() {
    return  (
      <div>
        <Button.Group>
          <Button id='list' icon='th'
            onClick={this.handleCardClick} />
          <Button id='card' icon='th list'
            onClick={this.handleListClick} />
        </Button.Group>{' '}
        <Button.Group>
          <Button icon>
            <Icon name='setting' />
          </Button>
        </Button.Group>

      </div>

    )
  }
}

export default ToolBar
