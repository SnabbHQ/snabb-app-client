/**
 * Need to still treat as async
 */
require('regenerator/runtime');

import type { Register, UpdatePassword } from '../../../types';

/**
 * # SnabbApi.js
 *
 * This class mocks Backend
 *
 */
export default class Backend {

  /**
   *
   * ### constructor
   * prepare the response for all the methods
   */
  constructor() {
    const _bodyInit = JSON.stringify({
      code: 200,
    });
    this.response = {
      status: 201,
    };
    this.response._bodyInit = _bodyInit;
  }

  async auth(data: Object) {
    return await this.response;
  }

  async register(data: Register) {
    return await this.response;
  }

  async logout() {
    return await this.response;
  }

  async forgotPassword(email: string) {
    return await this.response;
  }

  async getProfile() {
    return await this.response;
  }

  async sendVerifyEmail(email: string) {
    return await this.response;
  }

  async updatePassword(profileId: string, data: UpdatePassword) {
    return await this.response;
  }

  async updateProfile(profileId: string, data: Object) {
    return await this.response;
  }
}

