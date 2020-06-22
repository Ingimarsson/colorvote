import sqlite3

class Database(object):
  def __init__(self, db = 'database.db'):
    self.conn = sqlite3.connect(db)

    return

  def insert_block(block):
    return

  def insert_transaction(block):
    return

  def insert_election(block):
    return

  def insert_vote(block):
    return
