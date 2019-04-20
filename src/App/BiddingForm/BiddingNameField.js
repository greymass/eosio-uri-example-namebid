import React, { Component } from 'react';

import { Form } from 'semantic-ui-react';

const addressRegex = /^[a-z12345.]{1,12}$/;

class BiddingNameField extends Component {
  onChange = (e) => {
    const biddingName = e.target.value;
    this.props.setError('biddingName', undefined);

    if (addressRegex.test(biddingName)) {
      this.props.onStateChange({ biddingName })
    } else {
      this.props.setError(
        'biddingName',
        'The bidding name is invalid, it must be a string of 1-12 characters.'
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <Form.Input
          label="Enter the account name that you wish to bid on"
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default BiddingNameField;
