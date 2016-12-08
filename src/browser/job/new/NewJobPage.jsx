/* @flow */
import React from 'react'
import {provideHooks} from "redial"
import linksMessages from '../../../common/app/linksMessages'
import {PrimaryButton, Flex, Box, Title} from '../../app/components'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import JobFields from './JobFields'

const NewJobPage = ({intl}) => {

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
      <Box col={6} p={3}>
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
