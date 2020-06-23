# Colorvote Protocol 


## Types of transactions

Transactions can have different types depending on their role. The type is tagged in the least significant byte of the nSequence field of the first input of a transaction.

|Type|Hexadecimal|Decimal|
|-|-|-|
|Identification|0xB1|177|
|Issuance|0xB2|178|
|Transfer|0xB3|179|

### Identification transaction

An identification transaction is used to identify a colored address. A colored address should only submit one identifiaction transaction. Anyone can then search the blockchain for such a transaction to see what colors have been issued.

The first input of a identification transaction should come from the address that will become a color, and it should have 0xB1 in the least significant byte of nSequence.

The first output should be a P2PKH output, either back to the same address or somewhere else. There may also be an optional second output that contains an `OP_RETURN` script with some metadata about the color (i.e. link to election web page)

### Issuance transactions

An issuance transaction is used to create new colored voting coins. This kind of a transaction should have only one input from an address that has already made an identification transaction. This input should have 0xB2 in the least significant byte of nSequence.

The transaction can have any number of outputs but they should all be P2PKH. The output values should be a multiple of the voting unit (default 1) or else they will be concidered rounded down.

### Transfer transactions

A transfer transaction is used to transfer votes between addresses. A transfer transaction can have multiple inputs and outputs transferring multiple colors in a single transaction. As only the inputs can be traced to an issuance transaction to determine the color, we will use a scheme known as order-based coloring to determine the colors of the outputs from the inputs.



To account for the transaction fee, an additional input from an uncolored UTXO will need to be supplied.

### Commitment scheme

With most colored coins protocols, the balance of any address can be calculated at any time. This might be undesired for voting purposes, as the votes should only be countable after everyone has voted. To address this we introduce a cryptographic commitment scheme. Votes are then cast with two transactions. The first one is a commitment transaction that contains a commitment to a chosen recipient while keeping it hidden from others. The second one is a reveal transaction that contains a key to make the commitment visible to everyone. This way all votes are final once everyone has sent commitment transactions, but the votes can only be counted after everyone has sent reveal transactions.

The manager of an election should specify a deadline for sending commitments, and a deadline for sending reveals. This way commitments are only valid if sent before the first deadline, and reveals are only valid if send between the two deadlines.

#### Commitment transaction

#### Reveal transaction
