import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ElectionsPage extends Component {
  render() {
    return (
      <Container>
        <h1>Elections</h1>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Height</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Issued Votes</Table.HeaderCell>
              <Table.HeaderCell>Metadata</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Jul 4, 2020 7:57:44 PM</Table.Cell>
              <Table.Cell>701442</Table.Cell>
              <Table.Cell><Link
              to='/election/aa'>B77xG33a6ogDJpX4PgoM8qFTFvhWnRrUBY</Link></Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell><a href='#'>http://example.com/2020_election</a></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ElectionsPage
