import React, { Component } from 'react';

import { Form } from 'semantic-ui-react';

const decimalRegex = /^(\d*\.)?\d+$/;

class BiddingAmountField extends Component {
  onChange = (e) => {
    const biddingAmount = e.target.value;
    this.props.setError('donationAmount', undefined);

    if (decimalRegex.test(biddingAmount)) {
      this.props.onStateChange({ biddingAmount })
    } else {
      this.props.setError(
        'biddingAmount',
        'The bidding amount is invalid, it must be a decimal number with up to 4 decimals, eg: "1.0000".'
      )
    }
  };
  render() {
    return (
      <React.Fragment>
        <Form.Input
          label="Enter a Bidding Amount (in EOS)"
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default BiddingAmountField;
