import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';
//import adminReducer from './adminReducer';
import userReducer from './userReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import adminReducer from './adminReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'],
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language', 'systemMenuPath', 'positionHomePage', 'postionSpecialtyPage', 'positionDoctorPage'],
};
const patientPersistConfig = {
    ...persistCommonConfig,
    key: 'patient',
    whitelist: ['patientInfo'],
};
export default (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
        patient: persistReducer(patientPersistConfig, userReducer),
        admin: adminReducer,
    });
