import sqlite3

class Database(object):
  def __init__(self, db = 'database.db'):
    self.conn = sqlite3.connect(db)

    return

  def get_setting(self, key):
    c = self.conn.cursor()

    c.execute("SELECT value FROM settings WHERE key='%s';" % key)
    
    return c.fetchone()[0]

  def set_setting(self, key, value):
    c = self.conn.cursor()

    c.execute("UPDATE settings SET value='%s' WHERE key='%s';" % (value, key))
    self.conn.commit()

    return
