/* @flow */
import React from "react"
import {provideHooks} from "redial"
import {Fixed, Button, Box} from "../../app/components"
import {FormattedMessage} from "react-intl"
import JobFields from "./DeliveryFields"
import GoogleMap from "google-map-react"
import styled from "../../app/components/styled"


const LeftPanel = styled((theme, props) => ({
  $extends: Box,
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '40%'
  },
  '@media (max-width: 768px)': {
    width: '100%'
  },
  paddingRight: "4em",
  paddingLeft: "4em",
  marginBottom: "3em",
  backgroundColor: 'white',
  boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
}))

const RequestPanel = styled((theme, props) => ({
  $extends: LeftPanel,
  position: 'fixed',
  height: '60px',
  boxShadow: '0 -1px 1px rgba(0,0,0,.08)',
  paddingRight: "0px",
  paddingLeft: "0px",
  marginBottom: "0px",
  bottom: '0px',
  left: '0px',
}))

const RightPanel = styled((theme, props) => ({
  $extends: Fixed,
  bottom: '0px',
  right: '0px',
  top: '0px',
  width: '40%',
  '@media (min-width: 1200px)': {
    width: '60%'
  },
  zIndex: -1
}))

const NewJobPage = () => {

  function renderRequestButton() {
    return (
      <RequestPanel>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          height="100%"
          paddingRight={1}
        >
          <Button backgroundColor="info">
            <FormattedMessage
              id='newJobPage.requestButtonDisabled'
              defaultMessage='Request'/>
          </Button>
        </Box>
      </RequestPanel>
    )
  }

  const defaultProps = {
    center: {lat: 39.470128, lng: -0.370621},
    zoom: 16,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  return (
    <Box>
      <LeftPanel>
        <JobFields/>
        {renderRequestButton()}
      </LeftPanel>
      <RightPanel>
        <RightPanel/>
        <GoogleMap
          bootstrapURLKeys={{
                key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs',
                language: 'en',
              }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}>
        </GoogleMap>
      </RightPanel>
    </Box>
  )
}

export default NewJobPage
