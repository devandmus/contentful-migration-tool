const settings = require('../config/settings');
const contentfulImport = require('contentful-import');

function* envGenerator(){
  yield* settings.TO_ENVIRONMENT;
}

const uploadData = async ({
  entries = [],
  assets = [],
  contentTypes = [],
}) => {
  const options = {
    ...settings.base,
    content: {
      entries,
      assets,
      contentTypes
    },
    uploadAssets: assets && assets.length > 0,
    assetsDirectory: settings.DOWNLOAD_FOLDER,
  };

  const iterator = envGenerator();

  const uploadDataToEnv = async (env) => {
    await contentfulImport({
      ...options,
      environmentId: env,
    })
      .then(() => {
        console.log(`Imported data to "${env}" environment`)
      })
      .catch(err => {
        console.log('Import error', err)
      });
    await iteration();
  }

  const iteration = async () => {
    const { value, done } = iterator.next();
    if (done === false)
      await uploadDataToEnv(value);
  }

  await iteration();
};


module.exports = uploadData;
