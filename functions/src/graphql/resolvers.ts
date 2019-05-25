//import { getDevices, getById, getByName, getLatestFwVer, getFwUrl, deleteDevice, addDevice} from "./db"
//import {getUserInfo, getDataSource, getDevices, getByName, getFwUrl, getLatestFW, addFW, deleteFW,  deleteDevice} from "./db"
import {getActionEvents, addUserInfo, addActionEvents, changeDataSource, getEvents, getUserInfo, getDataSource } from "./db"

export const resolvers = {
    Query: {
        getDataSource: (_, { email }) => getDataSource(email),
        getUserInfo: (_, { email }) => getUserInfo(email),
        getEvents: (_, { dataSourceID, limit }) => getEvents(dataSourceID, limit),
        getActionEvents: (_, { dataSourceId }) => getActionEvents(dataSourceId)
    },
    Mutation: {
        changeDataSource: (_,{ dataSourceID, displayName, owner }) => changeDataSource(dataSourceID, displayName, owner),
        addActionEvents: (_,{ actionEvents }) => addActionEvents(actionEvents),
        addUserInfo: (_,{ userInfo }) => addUserInfo(userInfo)
    }
};

/*
export const resolvers = {
    Query: {
        devices: () => getDevices(),
        //deviceID: (_, { id }) => getById(id),
        getByName: (_, { name }) => getByName(name),
        getLatestFW: (_, { name }) => getLatestFW(name),
        deviceFWUrl: (_, { name, version}) => getFwUrl(name, version),
        getDataSource: (_, { email }) => getDataSource(email),
        getUserInfo: (_, { email }) => getUserInfo(email)
    },
    Mutation: {
        addFW: (_,{ name, version, url }) => addFW(name, version, url),
        deleteFW: (_,{ name, version }) => deleteFW(name, version),
        deleteDevice: (_, {name}) => deleteDevice(name),
        //addDevice: (_, {name, fw_list, fw_rel_list}) => addDevice(name, fw_list, fw_rel_list)
    }
};
*/
export default resolvers;
