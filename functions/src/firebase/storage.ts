
import admin from './admin'
import * as path from "path"
import * as os from "os"

let bucket = admin.storage().bucket();

const filePath = '/Users/hoon-mac/Desktop'; 
const fileName = path.basename(filePath);
const tempFilePath = path.join(os.tmpdir(), fileName);

export const tempFileDownload = async (name, version) => {
  try{
    await bucket.file(`${name}/${version}`).download({destination: '/Users/hoon-mac/Desktop/test.txt',})
    console.log('Image downloaded locally to', tempFilePath);
      
  } catch (err){
    console.log('[log]' ,err);
  }
};

export const tempFileUrl = async (name, version) => {
  try{
    const signedUrls = await bucket.file(`${name}/${version}`).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    })
    return signedUrls[0];
  }catch (err){
    console.log('[log] ' ,err);
    return err;
  }
}

/*
const tempFileUrl = (name, version) => {
  return bucket.file(`${name}/${version}`).getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  })
  .then(signedUrls => {
     console.log(signedUrls[0]); //contains the file's public URL
     return signedUrls[0];
  });
};
*/

/*
module.exports = {
  tempFileDownload: tempFileDownload,
  tempFileUrl: tempFileUrl
};

const tempFileDownload = (name, version) => {
  bucket.file(`${name}/${version}`).download({
    destination: '/Users/hoon-mac/Desktop/test.txt',})
    .then(function(){
      console.log('Image downloaded locally to', tempFilePath);
    })
    .catch(function(error){
      console.log('[log]'+'Error2');
    });//.then(() => fs.unlinkSync(tempFilePath));
    //res.send("done");
};

const tempFileUrl = (name, version) => {
  return bucket.file(`${name}/${version}`).getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  })
  .then(signedUrls => {
     console.log(signedUrls[0]); //contains the file's public URL
     return signedUrls[0];
  });
};
*/
