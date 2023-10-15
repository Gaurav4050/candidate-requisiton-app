import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout: React.FC = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={page}>
          <TabList>
            <CustomTab onClick={() => setPage(0)}>Requisition Details</CustomTab>
            <CustomTab onClick={() => setPage(1)}>Job Details</CustomTab>
            <CustomTab onClick={() => setPage(2)}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm setPage={setPage} page={page} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm setPage={setPage} page={page} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm setPage={setPage} page={page} />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
