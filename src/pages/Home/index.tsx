/*
 * @Author: Marcus.ma
 * @Date: 2023-12-01 17:11:37
 * @LastEditors: Marcus.ma
 * @LastEditTime: 2023-12-01 17:11:39
 * @FilePath: /child-app/src/pages/Home/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by Quectel / Marcus.ma, All Rights Reserved.
 */

import { useEffect } from "react";

import { useRequest } from "ahooks";
import { Button } from "antd";

import { getAPI } from "@/api/demo";

const Home: React.FC = () => {
  const { run, loading } = useRequest(getAPI, {
    manual: true,
  });
  useEffect(() => {
    // return () => {
    //   cancel();
    // };
  }, []);

  return (
    <>
      <Button loading={loading} onClick={run}>
        12121
      </Button>
    </>
  );
};
export default Home;
