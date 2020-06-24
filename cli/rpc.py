import requests
import json

class RPC(object):
  def __init__(self, config):
      self.config = config

      self.session = requests.Session()
      self.headers = {'content-type': 'text/plain'}
      self.url = "http://{}:{}@localhost:{}".format(self.config['username'], 
        self.config['password'], self.config['port'])

  def send_command(self, cmd, params = []):
    payload = {"method": cmd, "jsonrpc": "1.0", "params": params}

    response = self.session.post(self.url, headers=self.headers, 
      data=json.dumps(payload))
    responseJSON = response.json()

    return responseJSON['result']

  def test_connection(self):
    result = self.send_command("getinfo")

    return result

  def get_transaction(self, txid):
    raw = self.send_command("getrawtransaction", [txid])
    tx = self.send_command("decoderawtransaction", [raw])

    return tx

