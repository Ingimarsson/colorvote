Command Line
============

Installation
------------

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

Examples
--------
