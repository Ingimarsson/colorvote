CREATE TABLE vout (
  "transaction" TEXT NOT NULL,
  value INT NOT NULL,
  n INT NOT NULL,
  scriptPubKey TEXT NOT NULL,
  FOREIGN KEY ("transaction") REFERENCES "transaction"(hash),
  PRIMARY KEY ("transaction", n)
);
