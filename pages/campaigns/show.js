import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Router, Link } from '../../routes';

class CampaignShow extends Component{

  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);

    //return actually initializes this.props
    return {
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestCount: summary['2'],
      approversCount: summary['3'],
      manager: summary['4'],
      address: props.query.address
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw money.',
        style: {overflowWrap: 'break-word'} //wraps long text inside the card - responsive
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become a backer.'
      },
      {
        header: requestCount,
        meta: 'Number of Active Requests',
        description: 'Active Requests by the manager to withdraw money from the contract. Requests must be approved by approvers.'
      },
      {
        header: approversCount,
        meta: 'Number of Backers',
        description: 'Total number of active backers for this project.'
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'This is the total remaining balance available to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>
                    View Requests
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
