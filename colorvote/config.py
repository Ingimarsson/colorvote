import os
import sys
import shutil

DEFAULT_CONFIG = os.path.join(sys.path[0], 'config', 'colorvote.conf')
DEFAULT_DB = os.path.join(sys.path[0], 'config', 'database.sqlite3')

def read_config(path):
  """
  Reads the config file from a given directory and returns a ConfigParser
  object.
  """
  config = configparser.ConfigParser()

  config.read(os.path.join(path, 'colorvote.conf'))

  return config


def exists_config(path):
  """
  Returns True if all config files are found in given directory but False
  otherwise.
  """
  if not os.path.exists(os.path.join(path, 'colorvote.conf')):
    return False

  if not os.path.exists(os.path.join(path, 'database.sqlite3')):
    return False
  
  return True


def initialize_config(path):
  """
  Creates the specified directory and initializes (copies) default config files
  into it. If directory already exists then we raisaise an Exception.
  """
  if not os.isdir(path):
    raise Exception('initialize_config: path is not a directory')

  os.mkdir(path)

  shutil.copy2(DEFAULT_CONFIG, path)
  shutil.copy2(DEFAULT_DB, path)

  return
