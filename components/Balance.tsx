import { Divider, Text } from "@chakra-ui/react";
import Moralis from "moralis/types";
import moralis from "moralis";
import React, { useCallback, useEffect, useState } from "react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import Container from "./Container";

type BalanceProps = {
  user: Moralis.User;
};

const Balance: React.FC<BalanceProps> = ({ user }) => {
  const Web3Api = useMoralisWeb3Api();
  const { fetchERC20Balances, data } = useERC20Balances();

  const [balance, setBalance] = useState("");

  const fetchNativeBalance = useCallback(async (): Promise<void> => {
    if (user) {
      try {
        const result = await Web3Api.account.getNativeBalance({
          chain: "rinkeby",
          address: user.get("ethAddress"),
        });

        if (result.balance) {
          setBalance(moralis.Units.FromWei(result.balance));
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [Web3Api.account, user]);

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: {
        chain: "rinkeby",
        address: user.get("ethAddress"),
      },
    });
  }, [fetchERC20Balances, fetchNativeBalance, user]);

  return (
    <Container>
      <Text mb="6" fontSize="xl" fontWeight="bold">
        My ERC20 Tokens
      </Text>
      {balance && (
        <Text>
          {balance} <b>ETH</b>
        </Text>
      )}
      <Divider />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text>
              {moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b>
            </Text>
            <Divider />
          </div>
        ))}
    </Container>
  );
};

export default Balance;
