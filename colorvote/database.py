import sqlite3

class Database(object):
  """This is a database wrapper to use with the library.
  """
  def __init__(self, db = 'database.db'):
    """
    :param db: Path to sqlite3 database file.
    :type db: str, optional
    """
    self.conn = sqlite3.connect(db)

    return

  def get_setting(self, key):
    """Get a setting value from the database.

    :param key: The key of the setting
    :type key: str

    :return: Value of the setting
    :rtype: str
    """

    c = self.conn.cursor()

    c.execute("SELECT value FROM settings WHERE key='%s';" % key)
    
    return c.fetchone()[0]


  def set_setting(self, key, value):
    """Write a setting value to the database.

    :param key: The key of the setting
    :type key: str
    :param value: The value to write
    :type value: str
    """
    c = self.conn.cursor()

    c.execute("UPDATE settings SET value='%s' WHERE key='%s';" % (value, key))
    self.conn.commit()

    return


  def get_election(self, address):
    """Get an election from the database.
    """
    c = self.conn.cursor()

    c.execute("SELECT * FROM election WHERE address=?",
      (address, ))
    
    result = c.fetchone()

    if not result:
      return None

    return Election(
      time=result['time'], 
      block=result['block'],
      txid=result['txid'],
      address=result['address'],
      unit=result['unit'],
      metadata=result['metadata']
    )


  def insert_election(self, election):
    """Write an election to the database.
    """
    c = self.conn.cursor()

    c.execute("INSERT INTO election VALUES(?,?,?,?,?,?)", election)

    self.conn.commit()


  def get_transaction(self, txid, n):
    """Get a transaction from the database.
    """
    c = self.conn.cursor()

    c.execute("SELECT * FROM txout WHERE txid=? AND n=?", (txid, n))

    return c.fetchone()


  def insert_transaction(self, transaction):
    """Insert a transaction into the database.
    """
    c = self.conn.cursor()

    c.execute("INSERT INTO txout VALUES(?,?,?,?,?,?,?,?,?,?)", transaction)

    self.conn.commit()

  def get_commitment(self, address):
    """Get a commitment for given address from the database.
    """
    return

  def insert_commitment(self, address, commitment):
    """Write a commitment value for given address to the database.
    """
    return

