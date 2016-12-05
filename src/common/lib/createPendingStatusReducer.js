export default function([requestType, successType, failureType]) {
  return (state = false, action) => {
    switch (action.type) {
      case requestType:
        return true;
      case successType:
      case failureType:
        return false;
      default:
        return state;
    }
  };
}
