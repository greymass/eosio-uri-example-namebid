import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

import BiddingAmountField from './BiddingForm/BiddingAmountField';
import BiddingNameField from './BiddingForm/BiddingNameField';
import generateURI from '../functions/generateURI';
import lookupAccountName from '../functions/lookupAccountName';

class BiddingForm extends Component {
  state = {
    biddingAmount: '',
    biddingName: '',
    errors: {}
  };
  stateChange = (state) => {
    this.setState({ ...this.state, ...state })
  };
  setError = (name, error) => {
    const errors = this.state.errors
    errors[name] = error;

    this.setState({ errors })
  };
  lookupAccountName = () => {
    const { biddingName } = this.state;

    lookupAccountName(biddingName, (currentBiddingName, accountNameAvailable, highestBid) => {
      if (biddingName !== currentBiddingName) {
        return;
      }
      this.setState(
        {
          accountNameAvailable,
          minimumBid: (highestBid * 1.1),
          errors: { biddingName: (
            !accountNameAvailable &&
              !this.state.errors.biddingName &&
              'This account name is not available.'
          )}
        }
      );
    })
  };
  onSubmit = async () => {
    const { biddingAmount, biddingName } = this.state;

    this.setState({ generatingURI: true });
    const eosioURI = await generateURI(biddingAmount, biddingName);
    
    this.props.onStateChange({ eosioURI });
    this.setState({ generatingURI: false });
  };
  render() {
    const { biddingAmount, biddingName, errors, generatingURI } = this.state;
    const hasErrors = !!Object.values(errors).some(value => value !== undefined );
    return (
      <Form
        error={hasErrors}
        onSubmit={this.onSubmit}
        style={{ marginTop: 300, width: 300, margin: 'auto' }}
      >
        <BiddingNameField
          setError={this.setError}
          onStateChange={(state) => {
            this.stateChange(state);
            this.lookupAccountName(state.bid)
          }}
        />
        {biddingName !== '' && (
          <BiddingAmountField
            setError={this.setError}
            onStateChange={this.stateChange}
          />
        )}
        {Object.keys(errors).map(key => (
          <Message
            content={errors[key]}
            error
            key={key}
          />
        ))}
        {biddingAmount !== '' && (
          <Button
            color="blue"
            content="Generate URI"
            disabled={hasErrors}
          />
        )}
        {generatingURI && (
          <h2>Building Bid Transaction...</h2>
        )}
      </Form>
    );
  }
}

export default BiddingForm;
