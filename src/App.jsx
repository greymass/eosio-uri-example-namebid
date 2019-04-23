import React, { Component } from 'react';
import { Grid, Segment, Message, Header } from 'semantic-ui-react';

import BiddingForm from './App/BiddingForm';
import URIButton from './App/URIButton';

class App extends Component {
  state = {};

  onStateChange = (state) => {
    this.setState({ ...this.state, ...state });
  };
  render() {
    const { eosioURI } = this.state;

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
                This is an EOSIO uri example project created by Greymass to allow anyone to quickly bid on an account
                name. To start using this tool simply fill up the form below.
              "
            />
            <BiddingForm onStateChange={this.onStateChange} />
            {eosioURI && (
              <Segment style={{ padding: 30, marginTop: 20 }}>
                <Header>Your bid transaction is ready</Header>
                <p>Click the following button to be taken to your EOS URI enabled wallet.</p>
                <URIButton key='uri_previewer' eosioURI={eosioURI} />
              </Segment>
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
