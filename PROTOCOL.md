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

### Transfer transactions
