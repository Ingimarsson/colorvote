import React, { Component } from 'react';
import { Label, Container, Table } from 'semantic-ui-react';

class ElectionPage extends Component {
  render() {
    return (
      <Container>
        <h1>Election</h1>
        <h2>Summary</h2>
        <Table>
         <Table.Body>
            <Table.Row>
              <Table.Cell><b>Election Address</b></Table.Cell>
              <Table.Cell>B77xG33a6ogDJpX4PgoM8qFTFvhWnRrUBY</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Creation Date</b></Table.Cell>
              <Table.Cell>July 4, 2020 8:20:33 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Initial Transaction</b></Table.Cell>
              <Table.Cell>aaaffd...</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Issued Votes</b></Table.Cell>
              <Table.Cell>50</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Vote Unit</b></Table.Cell>
              <Table.Cell>1 SMLY</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Metadata</b></Table.Cell>
              <Table.Cell>http://binni.org</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <h2>Results</h2>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Votes</Table.HeaderCell>
              <Table.HeaderCell>Candidate Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
         <Table.Body>
            <Table.Row>
              <Table.Cell>16</Table.Cell>
              <Table.Cell>B77xG33a6ogDJpX4PgoM8qFTFvhWnRrUBY</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ElectionPage
