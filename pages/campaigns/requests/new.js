import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component{
  state = {
      value: '',
      description: '',
      recipient: '',
      loading: false,
      errorMessage: ''
  };

  static async getInitialProps(props){
    const address = props.query.address
    return {
      address: address
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const {description, value, recipient } = this.state
    this.setState({ loading: true, errorMessage: '' })
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(description, web3.utils.toWei(value,'ether'), recipient).send({
        from: accounts[0]
      })
      this.setState({ loading: false, errorMessage: '' })
    }catch (err){
      this.setState({ loading: false, errorMessage: err.message })
    }
  }

  render() {
    return(
      <Layout>
        <h3>New Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder = 'Enter a description of your request'
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <Input
              placeholder = '1.00'
              label='ether'
              labelPosition='right'
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              placeholder = "Recipients wallet address"
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>

          <Message
            error
            header='Oops!'
            content={this.state.errorMessage}
          />

          <Button primary loading={this.state.loading}>Request</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
