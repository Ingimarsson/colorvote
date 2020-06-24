import json

from .database import Database
from .rpc import RPC

from math import log, floor

class Colorvote(object):
  def __init__(self, config):
    self.config = config

    self.db = Database(config['database'])
    self.rpc = RPC(config['rpc'])

    return

  def create(self, address, unit, meta):
    """
    Creates a new election with a metadata transaction.

    To create an election we select a UTXO from the wallet with the specified
    address. Then we create a transaction with that only input, and two outputs.
    One to send the whole amount back to the same address, and one OP_RETURN ok
    output with the election metadata.

    @param address the election address
    @param unit the currency value of a single vote
    @param meta an ASCII string (max 80 char) to include in transaction

    @return transaction ID
    """

    if any(ord(c) > 128 for c in meta):
      raise Exception("Meta string contains illegal characters")

    if len(meta) > 80:
      raise Exception("Meta string is too long")

    # Convert voting coin value
    unit = int(unit*100000000)
    n = floor(log(unit, 10))

    k = int(unit/10**n)

    if k*10**n != unit:
      raise Exception(
        "Supplied unit value cannot be encoded, see documentation")

    vote_value = k+16*n % 256

    unspent = self.rpc.send_command("listunspent")

    i = 0

    while i < len(unspent) and unspent[i]['address'] != address:
      i += 1

    if i >= len(unspent):
      raise Exception(
        "Could not find an unspent transaction output for given address")

    inputs = [
      {
        'txid': unspent[i]['txid'],
        'vout': unspent[i]['vout'],
        'sequence': 177 + 256*vote_value
      }
    ]

    outputs = {
      unspent[i]['address']: unspent[i]['amount'] - 1,
      'data': meta.encode('ascii').hex()
    }

    if self.config['print']:
      print(json.dumps({'inputs':inputs, 'outputs': outputs}, indent=2))

    tx = self.rpc.send_command("createrawtransaction", [inputs, outputs])
    txid = ''

    if not self.config['nosend']:
      signed = self.rpc.send_command("signrawtransaction", [tx])
      txid = self.rpc.send_command("sendrawtransaction", [signed['hex']])
      
      print("Identification transaction sent")
      print(txid)

    return txid

  def issue(self, election, addresses, amounts):
    """
    Issues new voting coins for a given election.

    To issue coins we need to own an address that has made an identification
    transaction. The address is the color/ID of the election. This command look
    up the identifiaction transaction to read the vote value (the amount of the
    currency that is equal to one vote).

    @param election address of election
    @param addresses JSON array of addresses to issue to
    @param amounts JSON array of corresponding integers

    @return transaction id
    """

    election_info = self.db.get_election(election)

    if not election_info:
      raise Exception(
        "There is no election with this address, try rescanning the blockchain")

    unit = election_info['unit']

    vote_count = sum(amounts)

    # Search for an UTXO with enough funds

    # Create and send transaction 

    return


  def send(self, utxo, recepient, amount):
    """
    Transfer voting coins to a recepient
    """
    return

  def scan(self):
    """
    Search for colored voting transactions on the blockchain.

    """
    height = int(self.db.get_setting('height'))

    blocks = self.rpc.send_command('getinfo')['blocks']

    print("Starting scan at block %s, blockchain height %s" % (height, blocks))

    for i in range(height, blocks):
      block_hash = self.rpc.send_command("getblockhash", [i])
      block = self.rpc.send_command("getblock", [block_hash])

      if i % 1000 == 0:
        print("Scanning %i - %i" % (i, i+999))
        self.db.set_setting('height', i)

      for tx in block['tx']:
        raw = self.rpc.send_command("getrawtransaction", [tx])
        transaction = self.rpc.send_command("decoderawtransaction", [raw])

        # The sequence tag should always be in the first input
        sequence = transaction['vin'][0]['sequence']

        if sequence != 4294967295 and sequence != 0:
          # Identification transaction
          if sequence % 256 == 177:
            unit = floor(sequence/256) % 256
            k = unit % 16
            n = floor(unit/16)

            vout_n = transaction['vin'][0]['vout']
            utxo = self.rpc.get_transaction(transaction['vin'][0]['txid'])
            vout = utxo['vout'][vout_n]

            if len(transaction['vout']) < 2:
              raise Exception("invalid transaction")

            vout_meta = transaction['vout'][1]['scriptPubKey']

            if vout_meta['type'] != 'nulldata':
              raise Exception("second output should be op_return metadata")

            meta = bytearray.fromhex(vout_meta['hex'][4:]).decode()

            print("Colored address %s with metadata %s" % \
              (utxo['scriptPubKey']['addresses'][0], meta))

          # Issuance transaction
          if sequence % 256 == 178:
            print("Found issuance transaction")

          # Transfer transaction
          if sequence % 256 == 179:
            print("Found transfer transaction")

          print(i, tx, sequence)


    self.db.set_setting('height', blocks-1)
    return

  def list():

    return

  def trace():

    return
