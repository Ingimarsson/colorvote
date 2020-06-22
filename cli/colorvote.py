import json

from .database import Database
from .rpc import RPC

class Colorvote(object):
  def __init__(self, config):
    self.config = config

    self.db = Database(config['database'])
    self.rpc = RPC(config['rpc'])

    return

  def create(self, address, meta):
    """
    Creates a new election with a metadata transaction.

    To create an election we select a UTXO from the wallet
    with the specified address. Then we create a transaction
    with that only input, and two outputs. One to send the 
    whole amount back to the same address, and one OP_RETURN
    output with the election metadata.
    """

    if any(ord(c) > 128 for c in meta):
      raise Exception("Meta string contains illegal characters")

    if len(meta) > 80:
      raise Exception("Meta string is too long")

    unspent = self.rpc.send_command("listunspent")

    i = 0

    while i < len(unspent) and unspent[i]['address'] != address:
      i += 1

    if i >= len(unspent):
      raise Exception("Could not find an unspent transaction output for given address")

    inputs = [
      {
        'txid': unspent[i]['txid'],
        'vout': unspent[i]['vout'],
        'sequence': 177
      }
    ]

    outputs = {
      unspent[i]['address']: unspent[i]['amount'] - 1,
      'data': meta.encode('ascii').hex()
    }

    if self.config['print']:
      print(json.dumps({'inputs':inputs, 'outputs': outputs}, indent=2))

    tx = self.rpc.send_command("createrawtransaction", [inputs, outputs])

    if not self.config['nosend']:
      signed = self.rpc.send_command("signrawtransaction", [tx])
      txid = self.rpc.send_command("sendrawtransaction", [signed['hex']])
      
      print("Identification transaction sent")
      print(txid)

    return

  def scan(self):
    """
    Search for colored voting transactions on the blockchain.

    """
    for i in range(698000, 699000):
      block_hash = self.rpc.send_command("getblockhash", [i])
      block = self.rpc.send_command("getblock", [block_hash])

      for tx in block['tx']:
        raw = self.rpc.send_command("getrawtransaction", [tx])
        transaction = self.rpc.send_command("decoderawtransaction", [raw])

        for vin in transaction['vin']:
          if vin['sequence'] != 4294967295:
            print(tx, vin['sequence'])


    return

  def list():

    return

  def trace():

    return
