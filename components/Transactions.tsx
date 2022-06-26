import { Divider, Text } from "@chakra-ui/react";
import Moralis from "moralis/types";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import Container from "./Container";

const BASE_URL = "https://rinkeby.etherscan.io/tx/";

type TransactionsProps = {
  user: Moralis.User;
};

const Transactions: React.FC<TransactionsProps> = ({ user }) => {
  const Web3Api = useMoralisWeb3Api();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(async (): Promise<void> => {
    if (user) {
      try {
        const data = await Web3Api.account.getTransactions({
          chain: "rinkeby",
          address: user.get("ethAddress"),
          limit: 5,
        });

        if (data) {
          setTransactions(data.result);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [Web3Api.account, user]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <Container>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        Last transactions
      </Text>
      <ul>
        {transactions?.map((transaction) => (
          <li key={transaction.hash}>
            <Link href={`${BASE_URL}${transaction.hash}`}>
              <a target="_blank">{transaction.hash}</a>
            </Link>
            <Divider />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Transactions;
