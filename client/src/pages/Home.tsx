import { Title } from "@mantine/core";
import { Loading } from "@geist-ui/core";
import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DisplayCampaigns, {
  DisplayCampaignsProps,
} from "../components/DisplayCampaigns";
import { useAppState } from "../context";
import { Grid, Card, Text, Link, Button } from "@geist-ui/core";

const Home = () => {
  const { contract } = useAppState();
  const { data, isLoading } = useContractRead(contract, "getCampaigns");

  return (
    <div>
      <Title align="center" mb={20}>
        All Campaigns
      </Title>
{/* 
      <div className="flex flex-wrap items-center justify-center ">
        <div className="m-4 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 ">
          <Card width="500px">
            <img
              src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
              height="200px"
              width="400px"
              draggable={false}
            />
            <div className="">
              <div className="flex justify-between m-4">
                <Text h5>Geist UI React</Text>
                <Text font="1rem" type="secondary" small className="">
                  Modern and minimalist React UI library.
                </Text>
              </div>
              <div className="flex justify-between m-4">
                <Text h5>Geist UI React</Text>
                <Text font="1rem" type="secondary" small className="">
                  Modern and minimalist React UI library.
                </Text>
              </div>
              <div className="flex justify-between m-4">
                <Text h5>Geist UI React</Text>
                <Text font="1rem" type="secondary" small className="">
                  Modern and minimalist React UI library.
                </Text>
              </div>
              <div className="flex justify-between m-4">
                <Text h5>Geist UI React</Text>
                <Text font="1rem" type="secondary" small className="">
                  Modern and minimalist React UI library.
                </Text>
              </div>
              <div className="flex justify-between m-4">
                <Text p mt={0} type="secondary" >
                  Specifies origins that are allowed to see values of attributes
                  retrieved via features of the Resource Timing API, which would
                  otherwise be reported as zero due to cross-origin
                  restrictions.
                </Text>
              </div>
            </div>

            <Card.Footer className="flex justify-between">
              <Link
                block
                target="_blank"
                href="https://github.com/geist-org/geist-ui"
              >
                Visit source code on GitHub.
              </Link>
              <Button shadow type="secondary">
                Shadow
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div> */}
      

      {isLoading ? (
        <Loading scale={3} />
      ) : (
        <Grid className = "flex justify-center items-center h-full">
          {data.map((item: DisplayCampaignsProps, i: number) => {
            return (
              <DisplayCampaigns
                key={i}
                {...item}
                target={ethers.utils.formatEther(item.target.toString())}
                amountCollected={ethers.utils.formatEther(
                  item.amountCollected.toString()
                )}
                deadline={new Date(item.deadline.toNumber())}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Home;
