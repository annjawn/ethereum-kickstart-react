import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component{

  state = {
    value: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const campaign = Campaign(this.props.address);
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value,'ether')
      });
      this.setState({ value: '', loading: false, errorMessage: '' });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    }catch (err){
      this.setState({ loading: false, errorMessage: err.message });
    }
  }

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
          label='ether'
          labelPosition='right'
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message
          error
          header='Oops!'
          content={this.state.errorMessage}
        />
        <Button primary loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
