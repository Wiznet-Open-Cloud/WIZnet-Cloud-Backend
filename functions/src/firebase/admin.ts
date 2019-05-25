
const admin = require('firebase-admin');
import * as serviceAccount from "./wiznetiotservice-firebase-adminsdk-wd6pa-0d44c130c0.json"

const config = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://wiznetiotservice.appspot.com",
};

export default !admin.apps.length ? admin.initializeApp(config) : admin.app();
