import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import React from "react";
import { DevTools, loadServer } from "jira-dev-tool";

export const Row = styled.div<{
  between?: boolean;
  gap?: number | boolean;
  marginBottom?: number;
}>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"}></Spin>
  </FullPage>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    <DevTools></DevTools>
  </FullPage>
);
