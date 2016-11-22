import BackendFactory from "../../../../lib/BackendFactory"
import AppAuthToken from "../../../../lib/__mocks__/AppAuthToken"

import {getProfileSuccess, getProfileFailure} from "../actions/profileActions"
import * as ActionTypes from "../actions/ProfileActionTypes"

import {Observable} from 'rxjs/Observable';

import "rxjs/add/observable/of"
import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/switchMap"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

export default function getProfile(action$) {
  return action$.ofType(ActionTypes.GET_PROFILE_REQUEST)
    .switchMap(() =>
      Observable.fromPromise(new AppAuthToken().getSessionToken())
        .switchMap((sessionToken) => {
          return Observable.fromPromise(BackendFactory(sessionToken).getProfile())
        })
        .map(getProfileSuccess)
        .catch(error => Observable.of(
          getProfileFailure(error)
        ))
    )
}

