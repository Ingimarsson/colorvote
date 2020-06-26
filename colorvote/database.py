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
    return

  def insert_election(self, address, unit, metadata):
    """Write an election to the database.
    """
    return

  def get_commitment(self, address):
    """Get a commitment for given address from the database.
    """
    return

  def insert_commitment(self, address, commitment):
    """Write a commitment value for given address to the database.
    """
    return
