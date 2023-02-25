import { Box } from "@mui/material";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Board from "../components/Board";
import Drawer from "../components/MenuDrawer";
import { m_Discussion } from "../models/m_Discussion";
import discussionApi from "../services/firebase/discussionApi";
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const data = await discussionApi.getDiscussions();

  // Pass data to the page via props
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};

const Home = ({ data }: { data: m_Discussion[] }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Head>
        <title>Board - Glur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <Drawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Box component="main" sx={{ flex: 1 }}>
          <main className="h-screen w-full lg:grid lg:grid-cols-[300px_auto_300px] text-black dark:text-white">
            <div className="h-screen px-4 dark:bg-zinc-900">
              <Board discussions={data} setOpenMenu={setOpenMenu} />
            </div>
            <div className="hidden lg:block px-2 h-screen bg-slate-100 dark:bg-zinc-800"></div>
            <div className="pt-2 px-2 hidden lg:block bg-gray-150 dark:bg-zinc-900"></div>
          </main>
        </Box>
      </Box>
    </>
  );
};

export default Home;
