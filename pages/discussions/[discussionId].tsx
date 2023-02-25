import { Box } from "@mui/material";
import Board from "components/Board";
import DiscussionMain from "components/Discussion";
import CustomDrawer from "components/MenuDrawer";
import { m_Discussion } from "models/m_Discussion";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import discussionApi from "services/firebase/discussionApi";
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Normally the discussion model will be passed in if the user route to this page from the board page
  // But if the user directly type in the url, we need to fetch the data from the database
  const data = await discussionApi.getDiscussions();

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

const Discussion = ({ data }: { data: m_Discussion[] }) => {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const topic =
    typeof query.topic === "string"
      ? `${query.topic as string} - Glur`
      : "Glur";
  return (
    <>
      <Head>
        <title>{topic}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <CustomDrawer openMenu={open} setOpenMenu={setOpen} />
        <Box component="main" sx={{ flex: 1, overflow: "hidden" }}>
          <main className="h-screen w-full lg:grid lg:grid-cols-[300px_auto_300px] text-black dark:text-white">
            <div className="hidden px-4 lg:block dark:bg-zinc-900">
              <Board discussions={data} />
            </div>
            <DiscussionMain
              discussionId={query.discussionId as string | undefined}
              topic={query.topic as string | undefined}
              setOpenMenu={setOpen}
            />
          </main>
        </Box>
      </Box>
    </>
  );
};

export default Discussion;
