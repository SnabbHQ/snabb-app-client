/* @flow */
import React from "react"
import {provideHooks} from "redial"
import {Fixed, Button, Box} from "../../app/components"
import {FormattedMessage} from "react-intl"
import JobFields from "./JobFields"
import GoogleMap from "google-map-react"
import styled from "../../app/components/styled"


const LeftPanel = styled((theme, props) => ({
  $extends: Box,
  width: '60%',
  '@media (max-width: 768px)': {
    width: '100%'
  },
  paddingRight: "4em",
  paddingLeft: "4em",
  marginBottom: "3em",
  backgroundColor: 'white',
  boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
}))

const RightPanel = styled((theme, props) => ({
  $extends: Fixed,
  bottom: '0px',
  right: '0px',
  top: '0px',
  width: '40%',
  zIndex: -1
}))

const NewJobPage = () => {

  const styles = {
    requestFixedContainer: {
      height: 60,
      width: '60%',
      backgroundColor: 'white',
      boxShadow: '0 -1px 1px rgba(0,0,0,.08)'
    },
    requestFlexContainer: {
      justifyContent: 'flex-end',
      height: 60,
      paddingRight: 50,
    }
  }

  // TODO - Not added any longer in the Button?
  //type='submit'
  //id='requestButton'

  function renderRequestButton() {
    return (
      <Fixed bottom left style={styles.requestFixedContainer}>
        <Box display="flex" alignItems="center" style={styles.requestFlexContainer}>
          <Button>
            <FormattedMessage
              id='newJobPage.requestButtonDisabled'
              defaultMessage='Request'/>
          </Button>
        </Box>
      </Fixed>
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
