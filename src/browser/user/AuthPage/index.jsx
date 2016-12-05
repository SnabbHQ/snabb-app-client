import React, { PropTypes } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Link } from 'react-router';
import camelCase from 'lodash/camelCase';
import { logIn, signUp, passwordReset} from '../../../common/user/auth/actions2';
import { fetchClosestCity } from '../../../common/job/actions';
import ErrorMessage from '../../app/components/ErrorMessage';
import Button from '../../app/components/Button2';
import styles from './AuthPage.scss';
import layoutStyles from '../../app/styles/layout.scss';
import gridStyles from '../../app/styles/grid.scss';
import textStyles from '../../app/styles/text.scss';
import logoBlack from '../../../../assets/images/logoBlack.svg';
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields';
import {
  CITIES,
  DEFAULT_CITY
} from '../../../common/lib/constants';

const hooks = {
  browser: ({ dispatch }) => dispatch(fetchClosestCity())
};

const MESSAGES = defineMessages({
  companyNamePlaceholder: {
    id: 'authForm.companyName',
    defaultMessage: 'Company name'
  },
  firstnamePlaceholder: {
    id: 'authForm.firstnamePlaceholder',
    defaultMessage: 'First name'
  },
  lastnamePlaceholder: {
    id: 'authForm.lastnamePlaceholder',
    defaultMessage: 'Last name'
  },
  emailPlaceholder: {
    id: 'authForm.emailPlaceholder',
    defaultMessage: 'Email'
  },
  phonePlaceholder: {
    id: 'authForm.phonePlaceholder',
    defaultMessage: 'Phone (+33 1 23 45 67 89)'
  },
  passwordPlaceholder: {
    id: 'authForm.passwordPlaceholder',
    defaultMessage: 'Password'
  },
  invalidCredentials: {
    id: 'authForm.invalidCredentials',
    defaultMessage: 'Invalid email or password. Please retry'
  },
  clientRegisterEmailExist: {
    id: 'authForm.clientRegisterEmailExist',
    defaultMessage: 'This email is already used'
  },
  clientRegisterPhoneExist: {
    id: 'authForm.clientRegisterPhoneExist',
    defaultMessage: 'This phone is already used'
  },
  passwordValidateError: {
    id: 'authForm.passwordValidateError',
    defaultMessage: 'Password must be at least 8 characters long'
  }
});

const LogInForm = wrapFields(React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
    })
  },

  render() {
    const { renderText } = this.props.renderers;

    return (
      <div className={styles.logInForm}>
        {renderText('email', { id: 'email', type: 'email' })}
        {renderText('password', { id: 'password', type: 'password' })}

        <Link
          className={styles.passwordResetLink}
          to='/password-reset'
        >
          <FormattedMessage
            id='authForm.logInFormPasswordResetLink'
            defaultMessage='Forgot password?' />
        </Link>
      </div>
    );
  }
}), { messages: MESSAGES });

const LogInSection = (props) => {
  return (
    <div>
      <h1 className={[layoutStyles.mbm, textStyles.center].join(' ')}>
        <FormattedMessage
          id='authForm.logInTitle'
          defaultMessage='Log in to Stuart' />
      </h1>

      <LogInForm {...props} />

      <ErrorMessage
        id='logInError'
        errors={props.errors}
        className={layoutStyles.mts}
        messages={MESSAGES} />

      <Button
        block={true}
        kind='primary'
        disabled={props.disabled}
        className={layoutStyles.mtm}
        type='submit'>
        <FormattedMessage
          id='authForm.logInButton'
          defaultMessage='Log in' />
      </Button>

      <p className={[layoutStyles.mtm, textStyles.center].join(' ')}>
        <FormattedMessage
          id='authForm.logInSubtitle'
          defaultMessage="Don't have an account? {signUpLink}"
          values={{
            signUpLink: (
              <Link to='/sign-up'>
                <FormattedMessage
                  id='authForm.logInSubtitleSignUpLink'
                  defaultMessage='Sign up!' />
              </Link>
            )
          }} />
      </p>
    </div>
  );
};

const SignUpForm = wrapFields(React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: PropTypes.shape({
      company_name: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      password: PropTypes.string
    })
  },

  render() {
    const {
      countryCode,
      renderers: {
        renderText,
        renderPhone
      }
    } = this.props;

    return (
      <div>
        {renderText('company_name', { id: 'companyName' })}
        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('firstname', { id: 'firstname' })}
          </div>
          <div className={gridStyles.col6}>
            {renderText('lastname', { id: 'lastname' })}
          </div>
        </div>
        {renderText('email', { id: 'email', type: 'email' })}
        {renderPhone('phone', { id: 'phone', countryCode })}
        {renderText('password', { id: 'password', type: 'password' })}
      </div>
    );
  }
}), { messages: MESSAGES });

const SignUpSection = (props) => {
  return (
    <div>
      <h1 className={[layoutStyles.mbm, textStyles.center].join(' ')}>
        <FormattedMessage
          id='authForm.signUpTitle'
          defaultMessage='Sign up for Stuart' />
      </h1>

      <SignUpForm {...props} />

      <ErrorMessage
        id='SignUpError'
        errors={props.errors}
        className={layoutStyles.mts}
        messages={MESSAGES} />

      <Button
        block={true}
        kind='primary'
        disabled={props.disabled}
        className={layoutStyles.mtm}
        type='submit'>
        <FormattedMessage
          id='authForm.signUpButton'
          defaultMessage='Sign up' />
      </Button>

      <p className={[layoutStyles.mtm, textStyles.center].join(' ')}>
        <FormattedHTMLMessage
          id='authForm.signUpFooter'
          defaultMessage='By signing up, you agree to our <a href="https://stuart.com/terms/">terms of service</a> and <a href="https://stuart.com/privacy">privacy policy</a>.' />
      </p>

      <hr />

      <p className={textStyles.center}>
        <FormattedMessage
          id='authForm.signUpSubtitle'
          defaultMessage='Already have an account? {logInLink}'
          values={{
            logInLink: (
              <Link to='/log-in'>
                <FormattedMessage
                  id='authForm.signUpSubtitleLink'
                  defaultMessage='Log in!' />
              </Link>
            )
          }} />
      </p>
    </div>
  );
};

const PasswordResetForm = wrapFields(React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: PropTypes.shape({
      email: PropTypes.string
    })
  },

  render() {
    const { renderText } = this.props.renderers;

    return (
      <div>
        {renderText('email', { id: 'email', type: 'email' })}
      </div>
    );
  }
}), { messages: MESSAGES });

const PasswordResetSection = React.createClass({
  renderContent() {
    if (this.props.isDone) {
      return (
        <p className={[layoutStyles.mbm, textStyles.center].join(' ')}>
          <FormattedMessage
            id='authform.passwordResetSuccess'
            defaultMessage='Check your inbox' />
        </p>
      );
    }

    return (
      <div>
        <PasswordResetForm {...this.props} />

        <ErrorMessage
          id='PasswordResetError'
          errors={this.props.errors}
          className={layoutStyles.mts}
          messages={MESSAGES} />

        <Button
          block={true}
          kind='primary'
          disabled={this.props.disabled}
          className={layoutStyles.mtm}
          type='submit'
        >
          <FormattedMessage
            id='authform.passwordResetButton'
            defaultMessage='Send password reset email' />
        </Button>
      </div>
    );
  },

  render() {
    return (
      <div>
        <div className={[layoutStyles.mbm, textStyles.center].join(' ')}>
          <h1 className={layoutStyles.mbn}>
            <FormattedMessage
              id='authForm.passwordResetTitle'
              defaultMessage='Reset your password' />
          </h1>
          <p>
            <FormattedMessage
              id='authForm.passwordResetSubtitle'
              defaultMessage='Enter your email and we will send you a link to reset your password.' />
          </p>
        </div>

        {this.renderContent()}

        <p className={[layoutStyles.mtm, textStyles.center].join(' ')}>
          <Link to='/log-in'>
            <FormattedMessage
              id='authForm.passwordResetFooterLogInLink'
              defaultMessage='Back to log in' />
          </Link>
        </p>
      </div>
    );
  }
});

const validateEmail = (email) => email.match(/.+\@.+\..+/);

const SECTIONS = {
  logIn: {
    validate({ email, password }) {
      return validateEmail(email) && password.trim();
    },
    Section: LogInSection
  },
  signUp: {
    validate({ firstname, lastname, email, phone, password }) {
      return firstname.trim() && lastname.trim() && validateEmail(email) && phone.trim() && password.trim();
    },
    Section: SignUpSection
  },
  passwordReset: {
    validate({ email }) {
      return validateEmail(email);
    },
    Section: PasswordResetSection
  }
};

const AuthPage = React.createClass({
  getInitialState() {
    return {
      errors: [],
      isDone: false,
      isLoading: false,
      value: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
      }
    };
  },

  componentWillReceiveProps(nextProps) {
    const { path } = this.props.route;
    const { path: nextPath } = nextProps.route;

    // Clear errors when section changes.
    if (path !== nextPath) {
      this.setState({
        errors: [],
        isDone: false
      });
    }
  },

  handleSubmit(action, e) {
    e.preventDefault();

    const { validate } = SECTIONS[action];

    if (!validate(this.state.value)) { return; }

    this.setState({
      errors: [],
      isDone: false,
      isLoading: true
    });

    this.props[action](this.state.value).catch((error) => {
      const { errors } = error.response.body;
      this.setState({ errors });
    }).then(() => {
      if (!this.isMounted()) { return; }

      this.setState({
        isDone: true,
        isLoading: false
      });
    });
  },

  handleChange(value) {
    this.setState({
      errors: [],
      value
    });
  },

  render() {
    const { path } = this.props.route;

    const k = camelCase(path);
    const { validate, Section } = SECTIONS[k];

    return (
      <div className={[layoutStyles.centered, styles.authPageContainer].join(' ')}>
        <div className={gridStyles.container}>
          <div className={gridStyles.row}>
            <div className={[gridStyles.col12, gridStyles.colSm6, gridStyles.colMd4, gridStyles.colSmOffset3, gridStyles.colMdOffset4].join(' ')}>
              <form id={`${k}Form`} onSubmit={this.handleSubmit.bind(null, k)}>
                <img className={[styles.logo, layoutStyles.mbl].join(' ')} src={logoBlack} />

                <Section
                  countryCode={this.props.countryCode}
                  isDone={this.state.isDone}
                  disabled={!validate(this.state.value) || this.state.isLoading}
                  errors={this.state.errors}
                  onChange={this.handleChange}
                  value={this.state.value} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    countryCode: `${CITIES[state.closestCity || DEFAULT_CITY].countryCode}`
  };
}

export default provideHooks(hooks)(connect(mapStateToProps, {
  logIn,
  signUp,
  passwordReset
})(AuthPage));
