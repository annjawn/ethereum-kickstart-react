import React, {Component} from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component{
  //static means it's a Class function. This is a requirement by Next to pre-load
  //data for server side rendering
  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns: campaigns }; //this value gets assigned to props
  }

  renderCampaigns(){
    //below statement creates and array "items" containing item for the card group using MAP
    const items = this.props.campaigns.map( (address) => {
      return{
        header: address,
        description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
        fluid: true,
        style: {overflowWrap: 'break-word'}
      };
    });

    return <Card.Group items={items} />
  }

//all JSX below <Layout> tag get passed as children of Props to Layout.js
  render(){
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button floated='right' content='Create Campaign' icon='add' primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}


//For Next.js to work it is mandatory to export every component inside the js file
export default CampaignIndex;
