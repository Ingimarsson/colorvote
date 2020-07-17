import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Menu = styled.div`
  height: 50px;
  width: 100%;
  background-color: #577590;
  color: #fff;
`

const Dropdown = styled(Menu)`
  height: 200px;
  background-color: #6989a5;
`

const Item = styled.div`
  display: inline-block;
  padding: 15px 20px;
  font-size: 16px;
  color: #fff;
`

const MenuItem = styled(Item)`
  :hover {
    cursor: pointer;
    color: #ddd;
  }
`

const RightMenuItem = styled(MenuItem)`
  float: right;
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
  margin: 12px 6px;
`

const MobileInfoItem = styled(InfoItem)`

`

const MobileMenuItem = styled(MenuItem)`
  display: block;
`

const ColorLine = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, 
     #f94144 15%, #f3722c 15% 30%, #f8961e 30% 45%, #f9c74f 45% 60%, 
     #90be6d 60% 75%, #43aa8b 75% 90%, #577590 90% 100%);
`

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.intervalID = 0;

    this.state = {
      peers: 0,
      height: 0,
      isMobile: false,
      dropdown: false
    }
  }

  toggleDropdown = () => this.setState({dropdown: !this.state.dropdown});
  hideDropdown = () => this.setState({dropdown: false});

  componentDidMount() {
    this.loadData();

    this.intervalID = setInterval(this.loadData.bind(this), 5000);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);

    window.removeEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.setState({isMobile: window.innerWidth <= 760});
  }

  loadData() {
    let that = this;

    fetch('/info')
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          peers: data.connections, 
          height: data.height
        });
      });
  }

  render() {
    return (
      <div style={{marginBottom: 20}}>
        <ColorLine/>
        <Menu>
          <Container>
            <TitleItem>Colorvote</TitleItem>
            { !this.state.isMobile && [
              <MenuItem as={Link} to='/'>Elections</MenuItem>,
              <MenuItem as={Link} to='/transactions'>Transactions</MenuItem>,
              <MenuItem as={Link} to='/vote'>Vote</MenuItem>,
              <InfoItem>SMLY</InfoItem>,
              <InfoItem>Height {this.state.height}</InfoItem>,
              <InfoItem>Peers {this.state.peers}</InfoItem>
            ] }
            { this.state.isMobile &&
              <RightMenuItem onClick={this.toggleDropdown}>Menu</RightMenuItem>
            }
          </Container>
        </Menu>
        { (this.state.isMobile && this.state.dropdown) &&
          <Dropdown>
            <MobileMenuItem as={Link} to='/' onClick={this.hideDropdown}>Elections</MobileMenuItem>
            <MobileMenuItem as={Link} to='/transactions' onClick={this.hideDropdown}>Transactions</MobileMenuItem>
            <MobileMenuItem as={Link} to='/vote' onClick={this.hideDropdown}>Vote</MobileMenuItem>
            <MobileInfoItem>SMLY</MobileInfoItem>
            <MobileInfoItem>Height {this.state.height}</MobileInfoItem>
            <MobileInfoItem>Peers {this.state.peers}</MobileInfoItem>
          </Dropdown>
        }
      </div>
    );
  }
}

export default Navbar
