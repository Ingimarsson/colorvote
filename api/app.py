import atexit

from flask import Flask, jsonify
from apscheduler.schedulers.background import BackgroundScheduler

from colorvote import Colorvote

app = Flask(__name__)

config = {
  'rpc': {
    'username': 'smileycoinrpc',
    'password': '2nhUgEm7up4Usici957BqNPZWoXfeJfBtJUZwH1UXBTc',
    'port': 14242
  },
  'database': '../database.db'
}

def scan_blockchain():
  colorvote = Colorvote(config)

  colorvote.scan()

scheduler = BackgroundScheduler()
scheduler.add_job(func=scan_blockchain, trigger='interval', minutes=1)
scheduler.start()

atexit.register(lambda: scheduler.shutdown())

@app.route('/elections')
def elections():
  colorvote = Colorvote(config)

  elections = colorvote.db.get_elections()

  return jsonify([
    {
      'time': e.time,
      'block': e.block,
      'txid': e.txid,
      'address': e.address,
      'unit': e.unit,
      'metadata': e.metadata,
    } for e in elections
  ])


@app.route('/elections/<address>')
def election(address):
  colorvote = Colorvote(config)

  election = colorvote.db.get_election(address)

  return jsonify({
    'time': election.time,
    'block': election.block,
    'txid': election.txid,
    'address': election.address,
    'unit': election.unit,
    'metadata': election.metadata,
  })


@app.route('/elections/<address>/results')
def results(address):
  colorvote = Colorvote(config)

  results = colorvote.db.get_results(address)

  return jsonify([{
    'address': r['address'],
    'votes': r['votes'],
  } for r in results])


@app.route('/transactions')
def transactions():
  colorvote = Colorvote(config)

  transactions = colorvote.db.get_transactions()

  return jsonify([{
    'time': t['time'],
    'block': t['block'],
    'type': t['type'],
    'txid': t['txid'],
    'n': t['n'],
    'address': t['address'],
    'amount': t['amount'],
    'election': t['election']
  } for t in transactions])



@app.route('/info')
def info():
  colorvote = Colorvote(config)

  info = colorvote.rpc.execute('getinfo')
  height = colorvote.db.get_setting('height')
  
  return jsonify(
    {
      'connections': info['connections'],
      'version': info['version'],
      'height': height
    }
  )

@app.route('/unspent/<address>')
def unspent(address):
  colorvote = Colorvote(config)

  transactions = colorvote.db.get_unspent(address)

  return jsonify([{
    'time': t['time'],
    'block': t['block'],
    'election': t['election'],
    'amount': t['amount'],
    'txid': t['txid'],
    'n': t['n']
  } for t in transactions])


if __name__ == '__main__':
  app.run()
