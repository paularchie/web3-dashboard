import { Box, Image, Text } from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import Container from "./Container";

type NftProps = {
  user: Moralis.User;
};

const Nft: React.FC<NftProps> = ({ user }) => {
  const { getNFTBalances, data } = useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "rinkeby",
        address: user.get("ethAddress"),
      },
    });
  }, [getNFTBalances, user]);

  return (
    <Container>
      <Text fontSize="xl" fontWeight="bold">
        My NFTs
      </Text>
      {data && (
        <ul>
          {data.result.map((nft) => (
            <li key={nft}>
              <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md">
                {nft.image && <Image src={nft.image} alt="nft image" />}
                <p>{nft.token_uri}</p>
              </Box>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Nft;
