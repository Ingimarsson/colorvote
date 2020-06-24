# Colorvote Protocol 


## Types of transactions

Transactions can have different types depending on their role. The type is
tagged in the least significant byte of the nSequence field of the first input
of a transaction.

|Type|Hexadecimal|Decimal|
|-|-|-|
|Identification|0xB1|177|
|Issuance|0xB2|178|
|Transfer|0xB3|179|

### Identification transaction

An identification transaction is used to identify a colored address. A colored
address should only submit one identifiaction transaction. Anyone can then
search the blockchain for such a transaction to see what colors have been
issued.

The first input of a identification transaction should come from the address
that will become a color, and it should have 0xB1 in the least significant byte
of nSequence. 

The second least significant byte should contain the voting coin value (the
currency value of one vote) where the four least significant bytes are the
multiplier K and the four most significant bytes are the exponent N. The voting
coin value is then k*10^N satoshis.

|nSequence[1]|k|N|Voting coin|
|-|-|-|-|
|0x81|1|8|10^8 satoshi|
|0x7A|10|7|10^8 satoshi|
|0x6F|15|6|1.5*10^7 satoshi|
|0xA2|2|10|10^10 satoshi|

The first output should be a P2PKH output, either back to the same address or
somewhere else. There may also be an optional second output that contains an
`OP_RETURN` script with some metadata about the color (i.e. link to election web
page)

### Issuance transactions

An issuance transaction is used to create new colored voting coins. This kind of
a transaction should have only one input from an address that has already made
an identification transaction. This input should have 0xB2 in the least
significant byte of nSequence.

The transaction can have any number of outputs but they should all be P2PKH. The
output values should be a multiple of the voting unit (default 1) or else they
will be concidered rounded down.

### Transfer transactions

A transfer transaction is used to transfer votes between addresses. A transfer
transaction can have multiple inputs and outputs transferring multiple colors in
a single transaction. As only the inputs can be traced to an issuance
transaction to determine the color, we will use a scheme known as order-based
coloring to determine the colors of the outputs from the inputs.

To account for the transaction fee, an additional input from an uncolored UTXO
will need to be supplied.

## Commitment scheme

With most colored coins protocols, the balance of any address can be calculated
at any time. This might be undesired for voting purposes, as the votes should
only be countable after everyone has voted. To address this we introduce a
cryptographic commitment scheme. Using this scheme, votes are cast in two steps
with one transaction for each step.

The first one is a commitment transaction that contains a commitment to a chosen
recipient while keeping it hidden from others. The second one is a reveal
transaction that contains a key to make the commitment visible to everyone. This
way all votes are final once everyone has sent commitment transactions, but the
votes can only be counted after everyone has sent reveal transactions.

The manager of an election should specify a deadline for sending commitments,
and a deadline for sending reveals. This way commitments are only valid if sent
before the first deadline, and reveals are only valid if sent between the two
deadlines.

### Commitment transaction

A commitment transaction is a transfer transaction where a colored coin is not
transferred to a candidate but to an address that will later send the final
vote. In most cases it will probably be sent back to the same owner (can be same
address) which will later send a reveal transaction.

To add a commitment to a transfer transaction, we add an `OP_RETURN` output
after the output that should contain the commitment. To create a commitment to
an address X (with a public key P), we generate a random 256 bit number M and
then calculate SHA256(P||M) where || means bitwise or.

### Reveal transaction

A reveal transaction is a transfer transaction where a colored voting coin from
an UTXO with a commitment is sent to its final destination (the address of a
candidate). To make a valid reveal transaction we add an `OP_RETURN` after the
output that goes to the candidate. It should contain the random number M that
was generated for the commitment.

When counting votes we only consider UTXO's where the commitment matches the
reveal.
