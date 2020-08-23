.. _intro: 

============
Introduction
============

Colorvote is an experimental project intended to solve some of the problems that
many current voting systems face. Voting systems must be held to very high
standards, to ensure free and fair elections. But traditional voting systems
are not perfect, once the ballot is dropped into the box, we have no guarantee
that it will be correctly counted. Anonimity is also a big concern, so that
voters can't be bribed or threatened to vote in a particular way.

Electronic Voting
=================

Electronic voting can be divided in two categories:

   1. Electronic voting machines and counting machines
   2. Electronic voting over the internet (online voting)

Electronic voting machines have been used in many elections, but they face the
same problems as before, and may introduce new ones. For example there have been
issues with counting machines not counting correctly, and voting machines that
sometimes flip the vote.

.. image:: https://media2.giphy.com/media/3orif1zS11iWKhUJpK/giphy.gif
   :width: 60%
   :align: center

Online voting has been used in a few elections, but most methods that have been
used have been found to contain security problems by experts. In Estonia,
parliament elections have offered online voting since 2005. 


See `Tom Scott - Why Electronic Voting is Still a Bad Idea
<https://youtu.be/LkH2r-sNjQs>`_

Requirements
------------

The following requirements for electronic voting systems are defined in (Rura et
al, 2016). 

   * **Privacy**: Keeping the votes secret.
   * **Eligibility**: Allowing only registered voters to vote.
   * **Improvabiliy**: Voters should be unable to prove to others who they voted
     for.
   * **Convenience**: Everyone should be able to vote with minimal effort.
   * **Verifiability**: Users should be able to trust the tallying process.

Colored Coins
=============

Colored coins are a class of methods for representing assets on a blockchain.
Normally when funds are transferred on a blockchain, there is no way to
distinguish them like with serial numbers on bills. In order to make coins
distinguishable, we encode additional data in transactions. The method that is
used to encode this data is known as a `coloring scheme` (see :ref:`protocol`).
By coloring coins we can also make them represent real-world assets, such as
stocks, access codes, movie tickets or votes.

Electoral Systems
=================

An electoral system is the set of rules that determines how elections are
conducted and their results determined. The rules differ in many ways between
governments, organizations and other bodies that conduct elections. The aim of
colorvote is to provide flexibility on how elections are conducted.

The simplest electoral system is **first-past-the-post** (FPTP), where each
voter can only vote for one candidate, and the candidate who gets the most votes
wins.

The Schulze method
------------------

The STV method
--------------
