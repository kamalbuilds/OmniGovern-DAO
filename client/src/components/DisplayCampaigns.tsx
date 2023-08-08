// import { Grid, Card, Group, Button, Image, Text } from "@mantine/core";
import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateCampaignValidationType } from "../pages/CreateCampaign";
import { Grid, Card, Text, Link, Button } from "@geist-ui/core";

export interface DisplayCampaignsProps {
  id: string;
  title: string;
  description: string;
  image: string;
  target: ethers.BigNumber;
  deadline: ethers.BigNumber;
  amountCollected: ethers.BigNumber;
  owner: string;
  donators: string[];
}

export interface DisplayCampaignsCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  owner: string;
  donators: string[];
}

const DisplayCampaigns = (item: DisplayCampaignsCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/campaign-details/${item.id}`);
  };

  return (
    // <Grid.Col sm={6} md={4} lg={3}>
    //   <Card
    //     onClick={handleCardClick}
    //     className="cursor-pointer hover:transform hover:scale-105 transition-all duration-300 mx-2"
    //     shadow="sm"
    //     p="lg"
    //     radius="md"
    //   >
    //     <Card.Section>
    //       <Image src={item.image} height={160} alt="Norway" />
    //     </Card.Section>

    //     <Group position="apart" mt="md" mb="xs">
    //       <Text weight={500}>{item.title}</Text>
    //       <Text weight={500}>ETH {item.target}</Text>
    //     </Group>

    //     <Group position="apart" mt="md" mb="xs">
    //       <Text weight={500}>End Date :</Text>
    //       <Text weight={500}>{item.deadline.toDateString()}</Text>
    //     </Group>

    //     <Group position="apart" mt="md" mb="xs">
    //       <Text weight={500}> Total collected amount:</Text>
    //       <Text weight={500}>ETH {item.amountCollected}</Text>
    //     </Group>

    //     <Group position="apart" mt="md" mb="xs">
    //       <Text weight={500}> Owner by </Text>
    //       <Text weight={500}>{item.owner.substring(0, 10)}...</Text>
    //     </Group>

    //     <Text size="sm" color="dimmed">
    //       {item.description}
    //     </Text>
    //   </Card>
    // </Grid.Col>
    <div className="flex flex-wrap items-center justify-center w-[400px]">
      <div className="m-4 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-lg">
        <Grid width = "400px" onClick={handleCardClick} className = "flex flex-col justify-center items-center">
          <img
            src={item.image}
            height="200px"
            width="400px"
            draggable={false}
          />
          <div className="">
            {/* Title */}
            <div className="flex justify-between m-4">
              <Text h5>{item.title}</Text>
              <Text font="1rem" type="secondary" small className="">
                ETH {item.target}
              </Text>
            </div>

            {/* End date */}
            <div className="flex justify-between m-4">
              <Text h5>End Date :</Text>
              <Text font="1rem" type="secondary" small className="">
                {item.deadline.toDateString()}
              </Text>
            </div>

            {/* Total collected amount: */}
            <div className="flex justify-between m-4">
              <Text h5>Total collected amount:</Text>
              <Text font="1rem" type="secondary" small className="">
                ETH {item.amountCollected}
              </Text>
            </div>

            {/* Owner by */}
            <div className="flex justify-between m-4">
              <Text h5>Owner by</Text>
              <Text font="1rem" type="secondary" small className="">
                {item.owner.substring(0, 10)}...
              </Text>
            </div>
            <div className="flex justify-between m-4">
              <Text p mt={0} type="secondary">
                {item.description}
              </Text>
            </div>
          </div>

          <Card.Footer className="flex justify-center items-center">
            <Button shadow type="secondary">
              Fund Project
            </Button>
          </Card.Footer>
        </Grid>
      </div>
    </div>
  );
};

export default DisplayCampaigns;
