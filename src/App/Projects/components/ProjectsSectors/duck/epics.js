import * as actions from './actions';
import * as types from './types';
import API from '../../../../../API';
import { ofType, combineEpics } from 'redux-observable';
import { of, from } from 'rxjs';
import { switchMap, catchError, } from "rxjs/operators";

const getsectorsEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_SECTORS_START),
        switchMap(() =>  {
            return from(API.getSectors()).pipe(
            switchMap(res => { 
                return of(actions.getSectorsSuccess(res.data)) }),
            catchError(error => of(actions.getSectorsFailure(error)))
        )}
        ),
    )                                                                                                                                                                                                       
}

const createProjectSectorPic = action$ => {
    return action$.pipe(
        ofType(types.CREATE_PROJECT_SECTOR_START),
        switchMap(({payload}) => {
            return from(API.createProjectSectors(payload))
        }),
        switchMap(res => { return of(actions.createProjectSectorsSuccess(res)) }),
        catchError(error => of(actions.createProjectSectorsFailure(error)))
    )
}

export const  sectorsEpic= combineEpics(
    getsectorsEpic,
    createProjectSectorPic
)
