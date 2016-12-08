/* @flow */
import React from 'react'
import {provideHooks} from "redial"
import linksMessages from '../../../common/app/linksMessages'
import {PrimaryButton, Flex, Box, Title} from '../../app/components'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import JobFields from './JobFields'

const NewJobPage = ({intl}) => {

  const styles = {
    leftPanel: {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
    }
  }

  function renderRequestButton() {
    return (
      <PrimaryButton
        type='submit'
        id='requestButton'>
        <FormattedMessage
          id='newJobPage.requestButtonDisabled'
          defaultMessage='Request'/>
      </PrimaryButton>
    )
  }

  return (
    <Flex>
      <Box col={6} p={3} style={styles.leftPanel}>
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
