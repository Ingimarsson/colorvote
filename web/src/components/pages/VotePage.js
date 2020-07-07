import React, { Component } from 'react';
import { Container, Segment, Header, Input, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const CodeBlock = styled(Segment)`
  font-family: "Courier New", Courier, monospace;
  padding: 10px !important;
`

class VotePage extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>Vote</Header>
        <Header as='h3'>Step 1: Find an unspent vote in your wallet</Header>
        <p> In order to submit a vote you need to own an address that holds an
        unspent vote. Type in your address below to see all unspent votes that
        belong to it.</p> 
        <Input action='Search' placeholder='Address' />
        <Header as='h3'>Step 2: Select recepient and amount</Header>
        <p>Type in the address of the candidate you wish to vote for and the
        amount to send.</p>
        <Form>
          <Form.Field>
            <label>Receiver</label>
            <input placeholder='Receiver' />
          </Form.Field>
          <Form.Field>
            <label>Amount (SMLY)</label>
            <input placeholder='Amount' />
          </Form.Field>
          <Button>Create transaction</Button>
        </Form>
        <Header as='h3'>Step 3: Submit your vote</Header>
        <p>To send your voting transaction you need to execute the following
        commands in the wallet command line.</p>
        <CodeBlock>
        $ smileycoin-cli createrawtransaction ...
        </CodeBlock>
        <CodeBlock>
        $ smileycoin-cli signrawtransaction ...
        </CodeBlock>
         <CodeBlock>
        $ smileycoin-cli sendrawtransaction ...
        </CodeBlock>
      </Container>
    );
  }
}

export default VotePage
