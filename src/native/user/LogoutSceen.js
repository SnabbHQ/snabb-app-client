

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../common/auth/actions';
import * as globalActions from '../../common/global/globalActions';
import Header from '../app/components/Header';
import FormButton from '../app/components/FormButton';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '../../common/lib/I18n';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
});

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        isValid: state.auth.form.isValid,
      },
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch),
  };
}

class LogoutScreen extends Component {

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    const self = this;

    const onButtonPress = () => {
      this.props.actions.logout();
    };

    return (
      <View style={styles.container}>
        <View>
          <Header
            isFetching={this.props.auth.form.isFetching}
            showState={this.props.global.showState}
            currentState={this.props.global.currentState}
            onGetState={this.props.actions.getState}
            onSetState={this.props.actions.setState}
          />

          <FormButton
            isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
            onPress={onButtonPress.bind(self)}
            buttonText={I18n.t('snabb.logout')}
          />
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
