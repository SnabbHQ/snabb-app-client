/* @flow */
import React from "react"
import {Space, Block, Panel, PanelHeader, PanelFooter, Image, Link, PageHeader, SwitchTheme, Title, View} from "../app/components"
import { Flex, Box } from 'reflexbox'
import { Card, Form } from 'antd'
import Map from './Map';

const HomePage = () => {

  return (
    <Flex p={2} align='center'>
      <Box col={5}>
        <Card title="Request Pickup" style={{width: '100%'}}>
          <Form></Form>
        </Card>
        <Space x={2} />
        <Card title="Request Pickup">
          <Form></Form>
        </Card>
      </Box>
      <Box col={8} flexAuto>
      </Box>
    </Flex>
  )
}

export default HomePage;
