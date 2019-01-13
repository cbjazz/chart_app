import React from 'react'
import { Button, Header, Embed, Modal } from 'semantic-ui-react'

class DetailChartModal extends React.Component {

  render() {
    const remote_url='http://localhost:5001/?id=' + this.props.stock.title;
    return (
      <Modal trigger={<Button size='mini' primary icon='crosshairs' />}>
        <Modal.Header>{this.props.stock.title}</Modal.Header>
        <Modal.Content>
          <Embed
            icon='right circle arrow'
            placeholder={"data:image/png;base64," + this.props.stock.chart}
            url={remote_url}
          />
          <Modal.Description>
            <Header>SHOW ME THE DESCRIPTION</Header>
            <Button circular icon='left arrow' disabled />
            <Button circular>1</Button>
            <Button circular>2</Button>
            <Button circular>3</Button>
            <Button circular icon='right arrow' active />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default DetailChartModal
