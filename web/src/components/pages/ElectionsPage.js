import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import moment from 'moment';

class ElectionsPage extends Component {
  constructor(props) {
    super(props);

    this.intervalID = 0;

    this.state = {
      elections: [],
    }
  }

  componentDidMount() {
    this.loadData();

    this.intervalID = setInterval(this.loadData.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  loadData() {
    var that = this;
    
    fetch('/api/elections')
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          elections: data 
        });
      });
  }

  render() {
    return (
      <Container>
        <h1>Elections</h1>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Block</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Metadata</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.elections.map(election => 
              <Table.Row>
                <Table.Cell>{moment.unix(election.time).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                <Table.Cell>{election.block}</Table.Cell>
                <Table.Cell><Link
                to={'/election/'+election.address}>{election.address}</Link></Table.Cell>
                <Table.Cell>{election.metadata}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ElectionsPage
