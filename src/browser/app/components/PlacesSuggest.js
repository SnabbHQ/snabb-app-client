import React, {Component, PropTypes} from "react";
import Box from './Box';
import Divider from './Divider';
import styled from './styled';
import Text from './Text';

const StyledSuggestion = styled((theme) => ({
  $extends: Box,
  backgroundColor: theme.colors.gray,
  ':hover': {
    backgroundColor: theme.colors.gray2,
  },
  ':focus': {
    backgroundColor: theme.colors.gray2,
  },
  cursor: 'pointer',
}), 'button', ['onClick']);

class PlacesSuggest extends Component {
  constructor() {
    super();

    this.state = {
      coordinate: null,
      focusedSuggestIndex: 0,
      selectedLabel: "",
      suggests: [],
    };

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    this.updateSuggests(this.props.search)
  }

  componentWillReceiveProps(nextProps) {
    this.updateSuggests(nextProps.search)
  }

  handleSelectSuggest(suggest) {
    const {onSelectSuggest} = this.props;

    this.geocodeSuggest(suggest.description, () => {
      this.setState({selectedLabel: suggest.description, suggests: []}, () => {
        onSelectSuggest(suggest, this.state.coordinate)
      })
    })
  }

  updateSuggests(search) {
    const {suggestRadius, suggestTypes, suggestComponentRestrictions} = this.props;
    const autocompleteService = new google.maps.places.AutocompleteService();

    if (!search) {
      this.setState({suggests: []});
      return
    }

    autocompleteService.getPlacePredictions({
      input: search,
      location: new google.maps.LatLng(0, 0),
      radius: suggestRadius,
      types: suggestTypes,
      componentRestrictions: suggestComponentRestrictions,
    }, (googleSuggests) => {
      if (!googleSuggests) {
        this.setState({suggests: []});
        return
      }

      this.setState({
        focusedSuggestIndex: 0,
        suggests: googleSuggests,
      })
    })
  }

  geocodeSuggest(suggestLabel, callback) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: suggestLabel}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        const coordinate = {
          latitude: location.lat(),
          longitude: location.lng(),
          title: suggestLabel,
        };

        this.setState({coordinate}, callback)
      }
    })
  }

  handleKeyDown(e) {
    const {focusedSuggestIndex, suggests} = this.state;

    if (suggests.length > 0) {
      if (e.key === "Enter") {
        this.handleSelectSuggest(suggests[focusedSuggestIndex])
      } else if (e.key === "ArrowUp") {
        if (suggests.length > 0 && focusedSuggestIndex > 0) {
          this.focusSuggest(focusedSuggestIndex - 1)
        }
      } else if (e.key === "ArrowDown") {
        if (suggests.length > 0 && focusedSuggestIndex < suggests.length - 1) {
          this.focusSuggest(focusedSuggestIndex + 1)
        }
      }
    }
  }

  focusSuggest(index) {
    this.setState({focusedSuggestIndex: index})
  }

  renderNoResults() {
    const {textNoResults} = this.props;

    if(textNoResults === null) {
      return;
    }

    return (
      <Box
        backgroundColor="gray"
        padding={0.33}
      >
        {textNoResults}
      </Box>
    )
  }

  renderSuggest(suggest) {
    return (
      <Box padding={0.5}>
        <Text>{suggest.description}</Text>
      </Box>
    )
  }

  renderSuggests() {

    // TODO - Allow keyboard interactions
    const {focusedSuggestIndex, suggests} = this.state;
    return (
      <Box
        position="absolute"
        minWidth={16}
        boxShadow="0 1px 2px rgba(0,0,0,0.15)"
      >
        {suggests.length > 0
          ? suggests.map((suggest, key) => (
            <StyledSuggestion
              key={key}
              onClick={() => this.handleSelectSuggest(suggest)}
            >
              {this.renderSuggest(suggest)}
              <Divider marginTop="0" marginBottom="0"/>
            </StyledSuggestion>
          ))
          : this.renderNoResults()
        }
      </Box>
    )
  }

  render() {
    const {selectedLabel} = this.state;
    const {children, search} = this.props;
    return (
      <div onKeyDown={this.handleKeyDown}>
        {children}
        {search && selectedLabel !== search && this.renderSuggests()}
      </div>
    )
  }
}

PlacesSuggest.propTypes = {
  children: PropTypes.any.isRequired,
  onSelectSuggest: PropTypes.func,
  renderSuggest: PropTypes.func,
  search: PropTypes.string,
  suggestRadius: PropTypes.number,
  suggestTypes: PropTypes.array,
  suggestComponentRestrictions: PropTypes.object,
  textNoResults: PropTypes.string,
};

PlacesSuggest.defaultProps = {
  onSelectSuggest: () => {},
  search: "",
  suggestRadius: 20,
  suggestTypes: [],
  suggestComponentRestrictions: {
    country: ""
  },
  textNoResults: "No results",
};

export default PlacesSuggest
