/* @flow */
import React from 'react'
import {provideHooks} from "redial"
import {Container, Fixed, Button, Panel, Box} from '../../app/components'
//import {Fixed} from '../../app/components-old'
import {FormattedMessage} from 'react-intl'
import JobFields from './JobFields'
import GoogleMap from 'google-map-react';

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
      <Panel
        paddingRight="4em"
        paddingLeft="4em"
        marginBottom="3em"
        style={{
          backgroundColor: 'white',
          boxShadow: '3px 1px 3px rgba(0,0,0,.08)',
        }}
      >
        <JobFields/>
        {renderRequestButton()}
      </Panel>
      <Fixed bottom right top style={{
        width: '40%',
        zIndex: -1,
      }}>
        <Box style={{
            position: 'absolute',
            top: '72px',
            bottom: 0,
            left: '0px',
            right: 0
          }}>
          <GoogleMap
            bootstrapURLKeys={{
          key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs',
          language: 'en',
        }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}>
          </GoogleMap>
        </Box>
      </Fixed>
    </Box>
  )
}

export default NewJobPage
