import argparse

def run():
  parser = argparse.ArgumentParser()
  subparser = parser.add_subparsers(title='subcommands',
      description='list of valid subcommands',
      dest='cmd',
      required=True)

  parser_create = subparser.add_parser('create', help='create a new election')
  parser_create.add_argument('meta', help='string to include in genesis transaction')

  parser_issue = subparser.add_parser('issue', help='issue new votes')
  parser_issue.add_argument('election', help='address of election')
  parser_issue.add_argument('receiver', help='address to receive votes')
  parser_issue.add_argument('votes', type=int, help='number of votes to issue')

  parser_vote = subparser.add_parser('vote', help='send a vote')
  parser_vote.add_argument('election', type=int, help='address of election')
  parser_vote.add_argument('candidate', type=int, help='address of candidate')

  parser_list = subparser.add_parser('list', help='list elections')
  parser_list.add_argument('--count', type=int, help='number of results to return')

  parser_scan = subparser.add_parser('scan', help='scan blockchain for new votes')
  parser_scan.add_argument('--full', action='store_true', help='truncate local database and rescan blockchain')

  parser_trace = subparser.add_parser('trace', help='trace a vote to issuing transaction')

  parser_count = subparser.add_parser('count', help='count votes in an election')
  parser_count.add_argument('election', help='address of election')
  parser_count.add_argument('--count', type=int, help='number of results to return')

  parser.parse_args()

  if subparser.list:
      print("list")
