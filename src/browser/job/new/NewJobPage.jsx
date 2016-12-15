/* @flow */
import React from 'react'
import {provideHooks} from "redial"
import {Button, Box} from '../../app/components'
import {Fixed} from '../../app/components-old'
import {FormattedMessage} from 'react-intl'
import JobFields from './JobFields'
import GoogleMap from 'google-map-react';

const NewJobPage = () => {

  const styles = {
    leftPanel: {
      zIndex: 1,
      width: '60%',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)',
      paddingBottom: 80,
    },
    rightPanel: {
      width: '40%',
    },
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

  //type='submit'
  //id='requestButton'

  function renderRequestButton() {
    return (
      <Fixed bottom left style={styles.requestFixedContainer}>
        <Box alignItems="center" style={styles.requestFlexContainer}>
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
    <Box display="flex">
      <Box padding='small' style={styles.leftPanel}>
        <JobFields/>
        {renderRequestButton()}
      </Box>
      <Fixed bottom right top style={styles.rightPanel}>
        <GoogleMap
          bootstrapURLKeys={{
          key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs',
          language: 'en',
        }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}>
        </GoogleMap>
      </Fixed>
    </Box>
  )
}

export default NewJobPage
