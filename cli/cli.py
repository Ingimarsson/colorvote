import argparse
import json
import sys

from json.decoder import JSONDecodeError

from .colorvote import Colorvote

def run():
  parser = argparse.ArgumentParser()
  subparser = parser.add_subparsers(title='subcommands',
      description='list of valid subcommands',
      dest='cmd',
      required=True)

  parser.add_argument('--database', help='path to SQLite database')
  parser.add_argument('--config', help='path to JSON config file')
  parser.add_argument('--nosend', action='store_true', help='don\'t execute commands in wallet')
  parser.add_argument('--print', action='store_true', help='print the JSON RPC wallet commands')

  parser_create = subparser.add_parser('create', help='create a new election')
  parser_create.add_argument('address', help='issuing transaction')
  parser_create.add_argument('meta', help='string to include in genesis transaction')

  parser_issue = subparser.add_parser('issue', help='issue new votes')
  parser_issue.add_argument('election', help='address of election')
  parser_issue.add_argument('receiver', help='address to receive votes')
  parser_issue.add_argument('votes', type=int, help='number of votes to issue')

  parser_vote = subparser.add_parser('vote', help='send a vote')
  parser_vote.add_argument('election', help='address of election')
  parser_vote.add_argument('candidate', help='address of candidate')

  parser_list = subparser.add_parser('list', help='list elections')
  parser_list.add_argument('--count', type=int, help='number of results to return')

  parser_scan = subparser.add_parser('scan', help='scan blockchain for new votes')
  parser_scan.add_argument('--full', action='store_true', help='truncate local database and rescan blockchain')

  parser_trace = subparser.add_parser('trace', help='trace a vote to issuing transaction')

  parser_count = subparser.add_parser('count', help='count votes in an election')
  parser_count.add_argument('election', help='address of election')
  parser_count.add_argument('--count', type=int, help='number of results to return')

  parsed = parser.parse_args()


  config_path = parsed.config if parsed.config else 'config.json'

  try:
    with open(config_path) as config_file:
      config = json.load(config_file)

  except EnvironmentError:
    sys.exit("Could not read config file")

  except JSONDecodeError:
    sys.exit("Could not decode config JSON")

  config['nosend'] = parsed.nosend
  config['print'] = parsed.print

  if parsed.database : config['database'] = parsed.database

  colorvote = Colorvote(config)

  if parsed.cmd == 'create':
    colorvote.create(parsed.address, parsed.meta)

  elif parsed.cmd == 'scan':
    colorvote.scan()

