import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

import BiddingNameField from './DonationForm/BiddingNameField';
import BiddingAmountField from './DonationForm/BiddingAmountField';
import generateURI from '../functions/generateURI';

class BiddingForm extends Component {
  state = {
    donationAmount: '',
    donationRecipient: '',
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
  onSubmit = async () => {
    const { donationAmount, donationRecipient } = this.state;

    this.setState({ generatingURI: true });
    const eosioURI = await generateURI(donationAmount, donationRecipient);
    this.props.onStateChange({ donationAmount, eosioURI });
    this.setState({ generatingURI: false });
  };
  render() {
    const { donationAmount, errors, generatingURI, donationRecipient } = this.state;
    const hasErrors = !!Object.values(errors).some(value => ![undefined, null].includes(value) );
    return (
      <Form
        error={hasErrors}
        onSubmit={this.onSubmit}
        style={{ marginTop: 300, width: 300, margin: 'auto' }}
      >
        <BiddingNameField
          setError={this.setError}
          onStateChange={this.stateChange}
        />
        {donationAmount !== '' && (
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
        {donationRecipient !== '' && (
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
