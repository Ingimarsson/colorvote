CREATE TABLE vin (
  "transaction" TEXT NOT NULL,
  txid TEXT NOT NULL,
  vout INT NOT NULL,
  sequence INT NOT NULL,
  scriptSig TEXT NOT NULL,
  FOREIGN KEY ("transaction") REFERENCES "transaction"(hash),
  FOREIGN KEY (txid, vout) REFERENCES vout("transaction", n),
  PRIMARY KEY (txid, vout)
);
