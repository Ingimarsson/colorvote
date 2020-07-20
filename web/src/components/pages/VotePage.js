import React, { Component } from 'react';
import { Checkbox, Table, Container, Segment, Header, Input, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const CodeBlock = styled(Segment)`
  font-family: "Courier New", Courier, monospace;
  padding: 10px !important;
  white-space: pre-wrap;
`

class VotePage extends Component {
  constructor(props) {
    super(props);

    this.intervalID = 0;

    this.state = {
      stage: 1,
      address: '',
      unspent: [],
      txid: '',
      vout: 0,
      receiver: '',
      amount: 0,
      selected: -1,
      fee_address: '',
      fee_txid: '',
      fee_vout: 0,
      fee_amount: 0
    }
  }

  loadUnspent() {
    var that = this;
    
    fetch('/unspent/'+this.state.address)
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          unspent: data,
          stage: 2
        });
      });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    return (
      <Container>
        <Header as='h1'>Vote</Header>
        <Header as='h3'>Step 1: Find an unspent vote in your wallet</Header>
        <p> In order to submit a vote you need to own an address that holds an
        unspent vote. Type in your address below to see all unspent votes that
        belong to it.</p> 
        <Input 
          name='address'
          placeholder='Address' 
          onChange={this.handleChange}
          value={this.address}
          style={{width: '400px', marginRight: '20px'}}
        />
        <Button
          onClick={this.loadUnspent.bind(this)}
        >
          Search
        </Button>
        { this.state.stage > 1 &&
          <Container style={{marginTop: '24px'}}>
            <Header as='h3'>Step 2: Select unspent vote</Header>
            { this.state.unspent.length == 0 ?
              <Header as='h4'>There are no unspent votes belonging to this address</Header> :
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{width: '50px'}}></Table.HeaderCell>
                    <Table.HeaderCell>Election</Table.HeaderCell>
                    <Table.HeaderCell>Block</Table.HeaderCell>
                    <Table.HeaderCell>Votes</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.unspent.map((x,i) => 
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox 
                        checked={this.state.selected==i} 
                        onClick={() => this.setState({selected: i})}
                      />
                    </Table.Cell>
                    <Table.Cell>{x.election}</Table.Cell>
                    <Table.Cell>{x.block}</Table.Cell>
                    <Table.Cell>{x.amount}</Table.Cell>
                  </Table.Row>
                )}
                </Table.Body>
              </Table>
            }
          </Container>
        }
        { this.state.selected > -1 &&
          <Container style={{marginTop: '24px'}}>
            <Header as='h3'>Step 3: Select a recepient</Header>
            <p>Type in the address of the candidate you wish to vote for.</p>
            <Form>
              <Form.Field>
                <label>Receiver</label>
                <Input 
                  name='receiver'
                  placeholder='Receiver' 
                  onChange={this.handleChange}
                  value={this.receiver}
                />
              </Form.Field>
            </Form>
            <Header as='h3'>Step 4: Find an unspent output for transaction fees</Header>
            <p>Specify an unspent transaction output from your wallet to pay the
            transaction fees. Make sure it's not the same as the voting UTXO.
            Use the following command to list unspent outputs.</p> <CodeBlock>
            $ smileycoin-cli listunspent
            </CodeBlock>
            <p>Then type the address, txid, vout and value of the UTXO you want
            to use. This output is used to pay the transaction fee. The rest is
            sent back to the same address.</p>
            <Form>
              <Form.Group widths='equal'>
               <Form.Field>
                  <label>TXID</label>
                  <Input 
                    name='fee_txid'
                    placeholder='txid' 
                    onChange={this.handleChange}
                    value={this.fee_txid}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Vout</label>
                  <Input 
                    name='fee_vout'
                    placeholder='vout' 
                    onChange={this.handleChange}
                    value={this.fee_vout}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Address</label>
                  <Input 
                    name='fee_address'
                    placeholder='address' 
                    onChange={this.handleChange}
                    value={this.fee_address}
                  />
              </Form.Field>
               <Form.Field>
                  <label>Amount</label>
                  <Input 
                    name='fee_amount'
                    placeholder='amount' 
                    onChange={this.handleChange}
                    value={this.fee_amount}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            { this.state.fee_amount > 0 &&
              <Container style={{marginTop: '24px'}}>
                <Header as='h3'>Step 5: Submit your vote</Header>
                <p>To send your voting transaction you need to execute the following
                commands with the wallet command line tool.</p>
                <CodeBlock>
                $ smileycoin-cli createrawtransaction 
                  "[
                    {'{'}
                      \"txid\":
                      \"{this.state.unspent[this.state.selected].txid}\",
                      \"vout\": {this.state.unspent[this.state.selected].n},
                      \"sequence\": 179
                    {'}, {'}
                      \"txid\": \"{this.state.fee_txid}\",
                      \"vout\": {this.state.fee_vout}
                    {'}'}
                  ]"
                    {' "{'}
                      \"{this.state.receiver}\":
                      {this.state.unspent[this.state.selected].amount},
                      \"{this.state.fee_address}\":
                      {this.state.fee_amount - 1}
                    {'}"'}
                </CodeBlock>
                <CodeBlock>
                $ smileycoin-cli signrawtransaction {"<previous output>"}
                </CodeBlock>
                 <CodeBlock>
                $ smileycoin-cli sendrawtransaction {"<previous output>"}
                </CodeBlock>
              </Container>
            }
          </Container>
        }
      </Container>
    );
  }
}

export default VotePage
