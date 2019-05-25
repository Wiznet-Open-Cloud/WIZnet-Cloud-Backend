
import admin from './admin'
import { user } from 'firebase-functions/lib/providers/auth';
let FieldValue = require('firebase-admin').firestore.FieldValue;

let dataSource_collectionID = admin.firestore().collection("dataSource");
let userInfo_collectionID = admin.firestore().collection("userInfo");
let actionEvents_collectionID = admin.firestore().collection("actionEvents");

export const dbGetEvents = async (dataSourceID, limit) => {
  try{
    let buf = [], i = 0;
    
    let snapshot = await dataSource_collectionID.doc(`${dataSourceID}`).collection('events').orderBy('createdAt', 'desc').limit(limit).get();
    snapshot.forEach(doc => {
      console.log('[dbGetEvents]', dataSourceID, '=>', doc.data());
      buf[i++] = JSON.stringify(doc.data());
    });
    return buf;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbGetUserInfo = async (email) => {
  try{
    let buf, i = 0;
    let snapshot = await userInfo_collectionID.where('email', '==', `${email}`).get();
    snapshot.forEach(doc => {
      console.log('[dbGetDataSource]', doc.email, '=>', doc.data());
      buf = doc.data();
    });
    return JSON.stringify(buf);
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbGetDataSource = async (email) => {
  try{
    let buf = [], i = 0;
    let snapshot = await dataSource_collectionID.where('owner', '==', `${email}`).get();
    snapshot.forEach(doc => {
      console.log('[dbGetDataSource]', doc.owner, '=>', doc.data());
      buf[i++] = doc.data();
    });
    return buf;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbGetActionEvents = async (dataSourceId) => {
  try{
    let buf = [], i = 0;
    let snapshot = await actionEvents_collectionID.where('dataSourceId', '==', `${dataSourceId}`).get();
    snapshot.forEach(doc => {
      console.log('[dbGetActionEvents]', dataSourceId, '=>', doc.data());
      buf[i++] = JSON.stringify(doc.data());
    });
    return buf;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbAddUserInfo = async (userInfo) => {
  try{
    let snapshot, email, buf;
    buf = JSON.parse(userInfo);
    email = buf.email;

    snapshot = await userInfo_collectionID.doc(`${email}`).set(
      buf
    )
    return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};

export const dbAddActionEvents = async (actionEvents) => {
  try{
    let snapshot, buf;
    buf = JSON.parse(actionEvents);
    buf.createdAt = FieldValue.serverTimestamp();

    snapshot = await actionEvents_collectionID.add(buf)
    return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};

export const dbchangeDataSource = async (dataSourceID, displayName, owner) => {
  try{
    let snapshot;
    if (displayName != null && owner != null)
    {
      snapshot = await dataSource_collectionID.doc(`${dataSourceID}`).update({
        createdAt: FieldValue.serverTimestamp(),
        displayName: displayName,
        owner: owner
      })
    }
    else if (displayName != null && owner == null)
    {
      snapshot = await dataSource_collectionID.doc(`${dataSourceID}`).update({
        createdAt: FieldValue.serverTimestamp(),
        displayName: displayName
      })
    }

    else if (displayName == null && owner != null)
    {
      snapshot = await dataSource_collectionID.doc(`${dataSourceID}`).update({
        createdAt: FieldValue.serverTimestamp(),
        owner: owner
      })
    }
    return true;
    //return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};


//////////////////////// old //////////////////////
/*
export const dbGetNameList = async () => {
  try{
    let buf = [], i = 0;
    let snapshot = await collectionID_1.get();
    snapshot.forEach(doc => {
      console.log('[dbGetNameList]', doc.id, '=>', doc.data());
      buf[i++] = doc.data().devName;
    });
    return buf;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbGetByName = async (devName) => {
  try{
    let buf = [], i = 0;
    let snapshot = await collectionID_1.doc(`${devName}`).collection('firmwares').get();
    snapshot.forEach(doc => {
      console.log('[dbGetByName]', doc.id, '=>', doc.data());
      buf[i] = doc.data();
      buf[i++].createdAt = String(doc.data().createdAt);
    });
    return buf;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbGetLatestFW = async (devName) => {
  try{
    let result;
    let snapshot = await collectionID_1.doc(`${devName}`).collection('firmwares').orderBy('version', 'desc').limit(1).get();
    result = snapshot.docs[0].data();
    result.createdAt = String(snapshot.docs[0].data().createdAt);
    console.log('[dbGetLatestFw] ', result);
    return result;
  } catch (err) {
    console.log('Error getting documents', err);
    return err;
  }
};

export const dbAddDev = async (devName) => {
  try 
  {
    await collectionID_1.doc(devName).set({
      devName: devName
    })
    console.log ('[dbAddDev] Create Done');
    return true;
  }
  catch (err) {
    console.log('[dbAddDev] Error dbAddDev', err);
    return false;
  }
}

export const dbAddFW = async (devName, version, url) => {
  try{
    let result = await dbAddDev(`${devName}`);
    console.log('[dbAddFW] ', result);

    let snapshot = await collectionID_1.doc(`${devName}`).collection('firmwares').where('version', '==', `${version}`).get();

    if (snapshot.size === 0)
    {
      console.log('not to exist');
      await collectionID_1.doc(`${devName}`).collection('firmwares').doc().set({
        createdAt: FieldValue.serverTimestamp(),
        version: version,
        url: url
      })
    }
    else
    {
      console.log('already exist');
      await snapshot.docs[0].ref.set({
        createdAt: FieldValue.serverTimestamp(),
        version: version,
        url: url
      })
    }

    console.log('Document successfully written!');
    return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};

export const dbDeleteFW = async (devName, version) => {
  try{
    const snapshot = await collectionID_1.doc(`${devName}`).collection('firmwares').where('version', '==', `${version}`).get();
    if (snapshot.size === 0)
    {
      console.log('[dbDeleteFW] There is not this version');
      return false;
    }
    snapshot.forEach( doc => {
      console.log('[dbDeleteFW] ', doc.id, '=>', doc.data());
      doc.ref.delete();
    })
    console.log('Document successfully deleted!');
    return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};

export const dbDeleteDevice = async (devName) => {
  try
  {
    let snapshot = await collectionID_1.doc(`${devName}`).collection('firmwares').get();
    if (snapshot.size !== 0)
    {
      snapshot.forEach( doc => {
        console.log('[dbDeleteFW] ', doc.id, '=>', doc.data());
        doc.ref.delete();
      })
      console.log('Document successfully deleted!');
    }
    
    snapshot = await collectionID_1.where('devName', '==', `${devName}`).get();
    snapshot.forEach( doc => {
      console.log('[dbDeleteFW] ', doc.id, '=>', doc.data());
      doc.ref.delete();
    })
    console.log('Document Device deleted!');
    return true;
  } catch (err) {
    console.log('Error getting documents', err);
    return false;
  }
};
*/