
.. figure:: img/logo/colorvote-full-large.png
   :width: 70 %
   :align: center
   :alt: map to buried treasure

=========
Colorvote
=========

Colorvote is a colored coins protocol for voting on Bitcoin-based blockchains.
Transactions are marked in a special way so that users can create elections,
issue votes to voters, and transfer votes to candidates. The project is intended
for research purposes and should not be used for serious elections.

It is developed for use on the `SmileyCoin <https://smileyco.in/>`_ blockchain,
but should work with all Bitcoin-based blockchains. The protocol uses the
`nSequence` field of transaction inputs to identify colored coins (i.e. votes).
This approach requires no changes or soft forks to the blockchain, and has
minimal space overhead.

The project includes the following components

   *   **Protocol**: A specification for a colored coins voting protocol.
   *   **Python module**: A python module that contains a command line tool for
       managing elections. It talks to a local wallet using RPC.
   *   **Web service**: A special blockchain explorer to view election
       information, including election results and history of vote issuance and
       transfers.  
   *   **Wallet**: A web-based SmileyCoin wallet (CoinSpace fork) that has been
       modified for voting, making the voting process more user friendly.

Resources
=========

- `Source code <https://github.com/Ingimarsson/colorvote>`_
- `Documentation <https://colorvote.readthedocs.io>`_
- `Python (PyPI) package <https://pypi.org/project/colorvote/>`_

Table of Contents
=================

.. toctree::
   :maxdepth: 2
   :name: mastertoc


   intro
   start
   protocol
   web
   wallet
   class
