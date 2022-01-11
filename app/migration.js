const { getModel, getEntries, getAssets } = require('./requests');
const uploadData = require('./upload');

const migrateAll = async () => {
  const [model, entries] = await Promise.all([
    getModel(),
    getEntries(),
  ]);
  const assets = await getAssets({ model, entries }) || [];
  await uploadData({
    entries,
    assets,
    contentTypes: [ model ],
  });
};


module.exports = {
  migrateAll,
};
