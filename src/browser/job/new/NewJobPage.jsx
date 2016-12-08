/* @flow */
import React from 'react'
import {provideHooks} from "redial"
import linksMessages from '../../../common/app/linksMessages'
import {PrimaryButton, Toolbar, View, Fixed, Flex, Box, Title} from '../../app/components'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import JobFields from './JobFields'

const NewJobPage = ({intl}) => {

  const styles = {
    leftPanel: {
      width: '60%',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
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

  function renderRequestButton() {
    return (
    <Fixed bottom left style={styles.requestFixedContainer}>
      <Flex align="center" style={styles.requestFlexContainer}>
        <PrimaryButton
          type='submit'
          id='requestButton'>
          <FormattedMessage
            id='newJobPage.requestButtonDisabled'
            defaultMessage='Request'/>
        </PrimaryButton>
      </Flex>
    </Fixed>
    )
  }

  return (
    <Flex>
      <Box p={4} style={styles.leftPanel}>
        <JobFields/>
        {renderRequestButton()}
      </Box>
    </Flex>
  )
}

NewJobPage.propTypes = {
  intl: intlShape,
}

export default injectIntl(NewJobPage)
