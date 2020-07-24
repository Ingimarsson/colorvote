Getting Started
===============

The python package can be installed from PyPI.

.. code-block:: bash

    $ pip install colorvote

We can both use it as a command line tool, or import it as a module to our own
python project.

Command Line
------------

We can start by running 

.. code-block:: bash

    $ python3 -m colorvote scan

This will return an error as we haven't configured a wallet connection. When we
first run colorvote it will write a config and a database to the
:code:`~/.colorvote` directory. You can specify a different path with the
:code:`--datadir` option.

When you have added the correct configuration to :code:`config.json` we can scan
the blockchain again. To see if there were any elections found run

.. code-block:: bash

    $ python3 -m colorvote list

To vote in an election you need to hold a vote in your wallet's unspent outputs,
you can list them by running

.. code-block:: bash

    $ python3 -m colorvote balance

The output shows that we have one vote, let's send the vote to a candidate.

.. code-block:: bash

    $ python3 -m colorvote send dF3k <candidate> 1

It's a good idea to verify that the transaction looks right before sending it by
adding the :code:`--nosend` and :code:`--verbose` in front of the subcommand.

Usage
-----

The command line utility takes the following arguments.

.. code-block:: text

    usage: cli.py [-h] [--database DATABASE] [--config CONFIG] [--nosend]
    [--verbose] {create,issue,send,balance,list,scan,trace,count} ...

    optional arguments:
      -h, --help            show this help message and exit
      --database DATABASE   path to SQLite database
      --config CONFIG       path to JSON config file
      --nosend              don't execute commands in wallet
      --verbose             print the JSON RPC wallet commands

    subcommands:
      list of valid subcommands

      {create,issue,send,balance,list,scan,trace,count}
        create              create a new election
        issue               issue new votes
        send                send a vote
        balance             get unspent voting coins in wallet (or by address)
        list                list all elections on blockchain
        scan                scan blockchain for new votes
        trace               trace a vote to issuing transaction
        count               count votes for an election

Code Examples
-------------

Here is an example where we establish an election, by sending an identification
transaction to the blockchain.

.. code-block:: python

    from colorvote import Colorvote, RPC, Database

    wallet = RPC('rpcuser', 'rpcpass')
    db = Database('database.sqlite3')

    colorvote = Colorvote(wallet, db)

    # Scan blockchain for voting transactions and insert to database
    colorvote.scan()

    # Establish an election
    inputs, outputs = colorvote.create_id_tx('address', metadata='hello')
    wallet.send_transaction(inputs, outputs)

Colorvote can also be used only for the RPC connection.

.. code-block:: python

    from colorvote import RPC

    wallet = RPC('rpcuser', 'rpcpass')

    result = wallet.execute('getinfo')

    print(result)

