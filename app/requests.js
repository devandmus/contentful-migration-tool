const settings = require('../config/settings');
const contentfulExport = require('contentful-export');


const getModel = () =>
  contentfulExport(settings.model)
    .then(res => {
      const {
        contentTypes: allContentTypes
      } = res;
      return allContentTypes
        .find(el => el.sys.id === settings.MODEL_TO_MIGRATE);
    })
    .catch(e => {
      console.log('getModel error', e);
    });


const getEntries = () =>
  contentfulExport(settings.entries)
    .then(res => {
      const { entries } = res;
      return entries;
    })
    .catch(e => {
      console.log('getEntries error', e)
    });


const getAssets = ({ model, entries }) => {
  const { fields } = model;
  const assetsModelId = fields
    .filter(field => field.type === 'Link')
    .map(field => field.id);
  const assetsById = [];
  entries
    .forEach(entry => {
      assetsModelId.forEach(id => {
        try {
          const fieldId = entry.fields[id]['es-CL'].sys.id;
          assetsById.push(fieldId);
        }
        catch (e) {
        }
      })
    });
  const queryAssets = assetsById.map(id => `sys.id=${id}`);
  const assetsData = {
    ...settings.assets,
    queryAssets,
  };
  return contentfulExport(assetsData)
    .then(res => {
      if (res.assets) {
        const { assets } = res;
        return assets.filter(asset =>
          assetsById.includes(asset.sys.id)
        );
      }
      return null;
    })
    .catch(e => {
      console.log('assets error', e)
    });
};


module.exports = {
  getModel,
  getEntries,
  getAssets,
};
