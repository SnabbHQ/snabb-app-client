import React, {PropTypes} from 'react'
import { connect } from 'react-redux';
import {View} from "../../app/components"
import FieldHeader from "./FieldHeader"

const VehicleField = ({icon, title, quotes}) => {

  const renderExclVat = () => {
    // If hash is null it means that there are no quotes.
    if (!this.props.quotes.hash) { return; }

    return (
      <View>
        <FormattedMessage
          id='jobForm.exclVat'
          defaultMessage='Excl. VAT' />
      </View>
    )
  }

  return (
    <View>
      {renderExclVat}
      <FieldHeader icon={icon} title={title}/>
    </View>
  )
}


VehicleField.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quotes: PropTypes.object.isRequired
}

export default connect(
  (state: State) => ({
    quotes: {}//state.quotes.all,
  }),
  {},
)(VehicleField);
