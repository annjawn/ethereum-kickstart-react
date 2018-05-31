import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

const src = './kickstarter.png'

export default () => {
  return(
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className='item'>
          Crowd Coin
        </a>
      </Link>
      <Menu.Menu position='right'>
        <Link route="/">
          <a className='item'>
            Campaigns
          </a>
        </Link>
        <Link route="/campaigns/new">
          <a className='item'>
            +
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
