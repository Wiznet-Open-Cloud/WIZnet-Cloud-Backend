
//import { tempFileDownload, tempFileUrl } from "./../firebase/storage"
//const { tempFileDownload, tempFileUrl } = require("./../firebase/storage")
//import {dbGetDataSource, dbGetByName, dbGetNameList, dbGetLatestFW, dbAddFW, dbDeleteFW, dbDeleteDevice } from "./../firebase/db_access"
import {dbGetActionEvents, dbAddUserInfo, dbAddActionEvents, dbchangeDataSource, dbGetEvents, dbGetUserInfo, dbGetDataSource } from "./../firebase/db_access"


export const getEvents = async (dataSourceID, limit) => {
    const result = dbGetEvents(dataSourceID, limit);
    await result;
    console.log('[getEvents] ', result);
    return result;
};

export const getUserInfo = async (email) => {
    const result = dbGetUserInfo(email);
    await result;
    console.log('[getUserInfo] ', result);
    return result;
};

export const getDataSource = async (email) => {
    const result = dbGetDataSource(email);
    await result;
    console.log('[getDataSource] ', result);
    return result;
};

export const getActionEvents = async (dataSourceId) => {
    const result = dbGetActionEvents(dataSourceId);
    await result;
    console.log('[getActionEvents] ', result);
    return result;
};


export const addUserInfo = async (userInfo) => {
    const result = dbAddUserInfo(userInfo);
    await result;
    console.log('[addUserInfo] ', result);
    return result;
};

export const addActionEvents = async (actionEvents) => {
    const result = dbAddActionEvents(actionEvents);
    await result;
    console.log('[addActionEvents] ', result);
    return result;
};

export const changeDataSource = async (dataSourceID, displayName, owner) => {
    const result = dbchangeDataSource(dataSourceID, displayName, owner);
    await result;
    console.log('[changeDataSource] ', result);
    return result;
};

/*
export const getDevices = async () => {
    const result = dbGetNameList();
    await result;
    console.log('[getDevices] ', result);
    return result;
};

export const getByName = async (name) => {
    const result = dbGetByName(name);
    await result;
    console.log('[getByName] ', result);
    return result;
};

export const getLatestFW = async (name) => {
    const result = dbGetLatestFW(name);
    await result;
    console.log('[getLatestFw] ', result);
    return result;
};

export const addFW = async (name, version, url) => {
    const result = dbAddFW(name, version, url);
    await result;
    console.log('[addFW] ', result);
    return result;
};

export const deleteFW = async (name, version) => {
    const result = await dbDeleteFW(name, version);
    console.log('[deleteFW] ', result);
    return result;
};

export const deleteDevice = async (name) => {
    const result = await dbDeleteDevice(name);
    console.log('[deleteDevice] ', result);
    return result;
};

export const getFwUrl = (name, version) => {
    return tempFileUrl(name, version);
};
*/