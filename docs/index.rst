
=======================
Colorvote
=======================

Colorvote is a colored coins protocol for voting on the Bitcoin (and compatible
altcoin) blockchain. It is a modified version of the EPOBC colored coin protocol
and uses the nSequence field to mark transactions. The protocol requires no
changes to the blockchain (i.e. soft forks) and has minimal overhead as votes
are transferred with normal P2PKH transactions.

This project consists of a specification of the voting protocol, a web server to
explore elections on the blockchain, and a python module that can build voting
transactions and talk to a wallet over JSON-RPC.

Links
=====

- Source code: https://github.com/Ingimarsson/colorvote
- Documentation: https://colorvote.readthedocs.io
- PyPI package: https://pypi.org/project/colorvote/

Table of Contents
=================

.. toctree::
   :maxdepth: 2
   :name: mastertoc


   start
   class
   protocol
   web
