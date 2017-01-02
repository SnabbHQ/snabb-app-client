import UserRestApi from '../api/UserRestApi';

export default class UserDataStore {
  constructor(userRestApi: UserRestApi) {
    this.userRestApi = userRestApi;
  }

  getUser(userName: string, password: string) {}
}
