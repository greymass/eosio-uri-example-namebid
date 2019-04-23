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
    biddingNameAvailable: false,
    minimumBid: null,
    errors: {}
  };
  stateChange = (state, callback) => {
    this.setState({ ...this.state, ...state }, () => {
      callback && callback();
    });
  };
  setError = (name, error) => {
    const errors = this.state.errors
    errors[name] = error;

    this.setState({ errors })
  };
  lookupAccountName = () => {
    const { biddingName } = this.state;

    lookupAccountName(biddingName, (lookedUpBiddingName, biddingNameAvailable, highestBid) => {
      const { biddingName: currentBiddingName } = this.state;

      if (lookedUpBiddingName !== currentBiddingName) {
        return;
      }

      const newState = {
        infoOnBiddingName: lookedUpBiddingName,
        biddingNameAvailable,
        minimumBid: (highestBid || 0) * 1.1
      };
      if (!biddingNameAvailable && !this.state.errors.biddingName) {
        newState.errors.biddingAmount = 'This account name is not available.'
      }
      this.setState(newState);
    })
  };
  onSubmit = async () => {
    const { biddingAmount, biddingName } = this.state;

    if (!biddingAmount) {
      return;
    }

    this.setState({ generatingURI: true });
    const eosioURI = await generateURI(biddingAmount, biddingName);

    this.props.onStateChange({ eosioURI });
    this.setState({ generatingURI: false });
  };
  render() {
    const {
      biddingAmount,
      biddingName,
      biddingNameAvailable,
      errors,
      generatingURI,
      infoOnBiddingName,
      minimumBid
    } = this.state;

    if (parseFloat(biddingAmount) < minimumBid && !errors.biddingAmount ) {
      errors.biddingAmount = 'The minimum bid amount has not been met.'
    }

    const hasErrors = !!Object.values(errors).some(value => value !== undefined );
    const hasSuccess = infoOnBiddingName === biddingName && biddingNameAvailable;

    return (
      <Form
        error={hasErrors}
        success={hasSuccess}
        onSubmit={this.onSubmit}
        style={{ marginTop: 300, width: 300, margin: 'auto' }}
      >
        <BiddingNameField
          setError={this.setError}
          onStateChange={(state) => {
            this.stateChange(state, () => {
              this.lookupAccountName()
            });
          }}
        />
        {biddingName !== '' && biddingNameAvailable && (
          <React.Fragment>
            <BiddingAmountField
              setError={this.setError}
              onStateChange={this.stateChange}
            />
            <Message
              success
              content={`This account name is available and the minimum bid is ${minimumBid.toFixed(4)} EOS`}
            />
          </React.Fragment>
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
            content="Generate Transaction"
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
