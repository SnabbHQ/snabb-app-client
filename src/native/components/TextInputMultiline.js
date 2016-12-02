'use strict'

class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
      <View style={{
        backgroundColor: this.state.text,
        borderBottomColor: '#000000',
        borderBottomWidth: 1 }}
      >
        <UselessTextInput
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}
