import React, { Component } from 'react';
import { Container, Table, Label } from 'semantic-ui-react';

import moment from 'moment';

class TransactionsPage extends Component {
  constructor(props) {
    super(props);

    this.intervalID = 0;

    this.state = {
      transactions: [],
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
    
    fetch('/api/transactions')
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          transactions: data 
        });
      });
  }

  render() {
    return (
      <Container>
        <h1>Transactions</h1>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Election</Table.HeaderCell>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Height</Table.HeaderCell>
              <Table.HeaderCell>Receiver</Table.HeaderCell>
              <Table.HeaderCell>Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.transactions.map(transaction => 
              <Table.Row>
                <Table.Cell>
                  { transaction.type == 'issue' ?
                    <Label size='tiny' color='blue'>Issue</Label> :
                    <Label size='tiny'>Transfer</Label>
                  }
                </Table.Cell>
                <Table.Cell>{transaction.election}</Table.Cell>
                <Table.Cell>{moment.unix(transaction.time).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                <Table.Cell>{transaction.block}</Table.Cell>
                <Table.Cell>{transaction.address}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default TransactionsPage
