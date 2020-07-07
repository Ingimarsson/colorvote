import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';

class TransactionsPage extends Component {
  render() {
    return (
      <Container>
        <h1>Transactions</h1>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Height</Table.HeaderCell>
              <Table.HeaderCell>Election</Table.HeaderCell>
              <Table.HeaderCell>Receiver</Table.HeaderCell>
              <Table.HeaderCell>Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Jul 4, 2020 7:57:44 PM</Table.Cell>
              <Table.Cell>701442</Table.Cell>
              <Table.Cell><a href='#'>B77xG33a6ogDJpX4PgoM8qFTFvhWnRrUBY</a></Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell><a href='#'>B77xG33a6ogDJpX4PgoM8qFTFvhWnRrUBY</a></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default TransactionsPage
