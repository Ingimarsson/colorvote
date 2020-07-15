import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Menu = styled.div`
  height: 50px;
  width: 100%;
  background-color: #577590;
  color: #fff;
  margin-bottom: 20px;
`

const Item = styled.div`
  display: inline-block;
  margin: 15px 20px;
  font-size: 16px;
  color: #fff;
`

const MenuItem = styled(Item)`
  :hover {
    cursor: pointer;
    color: #ddd;
  }
`

const TitleItem = styled(Item)`
  font-weight: 800;
`

const InfoItem = styled(Item)`
  background-color: #ffffff44;
  font-size: 12px;
  float: right;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 12px;
  margin-right: 0px;
`

const ColorLine = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, 
     #f94144 15%, #f3722c 15% 30%, #f8961e 30% 45%, #f9c74f 45% 60%, 
     #90be6d 60% 75%, #43aa8b 75% 90%, #577590 90% 100%);
`

class Navbar extends Component {
  render() {
    return (
      <div>
        <ColorLine/>
        <Menu>
          <Container>
            <TitleItem>Colorvote</TitleItem>
            <MenuItem as={Link} to='/'>Elections</MenuItem>
            <MenuItem as={Link} to='/transactions'>Transactions</MenuItem>
            <MenuItem as={Link} to='/vote'>Vote</MenuItem>
            <InfoItem>SMLY</InfoItem>
            <InfoItem>Height 702441</InfoItem>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default Navbar
