import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Grid, Button, Table } from 'semantic-ui-react';
import { Router, Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component{
  static async getInitialProps(props){
    const address = props.query.address;
    const campaign = Campaign(address);

    //Solidity doesn't support array of dynamic types or reference types so we cannot return an array of requests
    //from the contract itself. WE will get total requests and then fetch each request individually
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
      .fill()                   //returns only the indexes in an array like enumerated()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return {
      address: address,
      requests: requests,
      requestCount: requestCount,
      approversCount: approversCount
    };
  }

  renderRow() {

    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          totalApprovers={this.props.approversCount}
          request={request}
          address={this.props.address}
        />
      );
    })
  }

  render() {
    const{ Header, Row, HeaderCell, Body } = Table; //just pull the properties from the Table tag of Semantic UI

    return(
      <Layout>
      <h3>Funding Requests</h3>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
        <a>
          <Button primary floated='right' style={{ marginBottom: 10 }}>
            Request Funding
          </Button>
        </a>
      </Link>

      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>
          {this.renderRow()}
        </Body>
      </Table>
      <div>
        Found {this.props.requestCount} requests.
      </div>
      </Layout>
    );
  }
}

export default RequestIndex;
