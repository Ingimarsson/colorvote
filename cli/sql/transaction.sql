CREATE TABLE "transaction" (
  block INT NOT NULL,
  hash TEXT NOT NULL,
  size INT NOT NULL,
  FOREIGN KEY (block) REFERENCES block(id)
);
