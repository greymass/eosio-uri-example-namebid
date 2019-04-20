import React, { Component } from 'react';
import {Button, Segment} from 'semantic-ui-react';

class URIPreviewer extends Component {
  state = {};

  render() {
    const { eosioURI } = this.props;

    const segmentStyle = {
      margin: 10,
      padding: 20
    };

    return (
      <Segment basic style={segmentStyle}>
        <a
          href={`https://eosio.to/${eosioURI.split('eosio:')[1]}`}
          key="link"
          style={{ marginBottom: 20 }}
          target="_blank"
        >
          <Button
            content="Make Bid"
          />
        </a>
      </Segment>
    );
  }
}

export default URIPreviewer;
