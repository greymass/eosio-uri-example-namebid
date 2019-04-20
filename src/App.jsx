import React, { Component } from 'react';
import { Grid, Segment, Message } from 'semantic-ui-react';

import BiddingForm from './App/BiddingForm';
import URIButton from './App/URIButton';

class App extends Component {
  state = {};

  onStateChange = (state) => {
    this.setState({ ...this.state, ...state });
  };
  render() {
    const { donationAmount, eosioURI, generatingButton } = this.state;

    const segmentStyle = {
      margin: 'auto',
    };

    return (
      <Grid centered>
        <Segment
          aligned="center"
          basic
          style={segmentStyle}
        >
          <Segment basic style={{ marginTop: 100, minHeight: window.innerHeight - 140, width: 400 }}>
            <Message
              success
              style={{ marginBottom: 100 }}
              content="
                This is an EOSIO uri example project created by Greymass to allow any website owner to generate
                a donation link and/or button. To start using this tool simply fill up the form below.
              "
            />
            <BiddingForm onStateChange={this.onStateChange} />
            {eosioURI && (
              <URIButton key='uri_previewer' eosioURI={eosioURI} />
            )}
          </Segment>
          <div style={{ margin:'auto', width: 200} }>
            <h3>Powered By Greymass</h3>
          </div>
        </Segment>
      </Grid>
    );
  }
}

export default App;
