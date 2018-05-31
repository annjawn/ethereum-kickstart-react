import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class CampaignNew extends Component{
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' })
    try{
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from: accounts[0]
      });
      this.setState({ loading: false })

      //Take back to Root route
      Router.pushRoute('/');
    }catch (err){
      this.setState({ errorMessage: err.message })
      this.setState({ loading: false })
    }

  };

  render(){
    return(
      <Layout>
        <h3>Add A New Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
              />
          </Form.Field>
          <Message
            error
            header='Oops!'
            content={this.state.errorMessage}
          />
          <Button floated='left' content='Create' icon='add' primary loading={this.state.loading} />
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew;
