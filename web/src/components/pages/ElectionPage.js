import React, { Component } from 'react';
import { Label, Container, Table } from 'semantic-ui-react';

import moment from 'moment';

class ElectionPage extends Component {
  constructor(props) {
    super(props);

    this.intervalID = 0;

    this.state = {
      address: '',
      time: 0,
      block: 0,
      txid: '',
      metadata: '',
      unit: 0,
      votes: []
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
    
    fetch('/elections/'+this.props.match.params.address)
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          address: data.address,
          block: data.block,
          metadata: data.metadata,
          time: data.time,
          txid: data.txid,
          unit: data.unit,
        });
      });
 
    fetch('/elections/'+this.props.match.params.address+'/results')
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          votes: data
        });
      });

  }

  render() {
    return (
      <Container>
        <h1>Election</h1>
        <h2>Summary</h2>
        <Table style={{wordBreak: 'break-all'}}>
         <Table.Body>
            <Table.Row>
              <Table.Cell style={{width: '40%'}}><b>Election Address</b></Table.Cell>
              <Table.Cell>{this.state.address}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Creation Date</b></Table.Cell>
              <Table.Cell>{moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Initial Transaction</b></Table.Cell>
              <Table.Cell>{this.state.txid}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Vote Unit</b></Table.Cell>
              <Table.Cell>{this.state.unit} SMLY</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>Metadata</b></Table.Cell>
              <Table.Cell>{this.state.metadata}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <h2>Results</h2>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{width: '20%'}}>Votes</Table.HeaderCell>
              <Table.HeaderCell>Candidate Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.votes.map(x =>
              <Table.Row>
                <Table.Cell>{x.votes}</Table.Cell>
                <Table.Cell>{x.address}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ElectionPage
