
.. figure:: img/logo/colorvote-full-large.png
   :width: 70 %
   :align: center
   :alt: map to buried treasure

=========
Colorvote
=========

Colorvote is a colored coins protocol for voting on Bitcoin-based blockchains.
Transactions are marked in a special way so that users can create elections,
issue votes to voters, and transfer votes to candidates. The project is mostly
intended for research purposes and is currently not recommended for serious
elections.

It is developed for use on the `SmileyCoin <https://smileyco.in/>`_ blockchain,
but should work with all Bitcoin-based blockchains. The protocol uses the
`nSequence` field of transaction inputs to identify colored coins (i.e. votes).
This approach requires no changes or soft forks to the blockchain, and has
minimal space overhead.

The project includes the following components:

   *   **Protocol**: A specification for the voting protocol, which is based on
       the concept of colored coins.
   *   **Python module**: A python module that contains a command line tool for
       managing elections, by talking to a local wallet using RPC.
   *   **Web service**: A special blockchain explorer to view election
       information, including election results and history of vote issuance and
       transfers.  
   *   **Wallet**: A web-based SmileyCoin wallet (CoinSpace fork) that has been
       modified for voting, making the voting process more user friendly.

For more information about the problems that colorvote is intended to solve,
check out the :ref:`intro` page. To get started with the colorvote utility,
creating elections and casting votes, check out the :ref:`start` page.


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
