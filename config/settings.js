const yaml = require('js-yaml');
const fs = require('fs');

const settings = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

const BASE = {
  environmentId: settings.FROM_ENVIRONMENT,
  spaceId: process.env.SPACE_ID,
  managementToken: process.env.MANAGEMENT_TOKEN,
  saveFile: false,
};

settings.base = BASE;

settings.model = {
  ...BASE,
  skipContent: true,
}

settings.entries = {
  ...BASE,
  queryEntries: [`content_type=${settings.MODEL_TO_MIGRATE}`],
  skipContentModel: true,
  queryAssets: ['sys.id=.'],
};

settings.assets = {
  ...BASE,
  skipContentModel: true,
  downloadAssets: true,
  exportDir: settings.DOWNLOAD_FOLDER,
  assetsDirectory: settings.DOWNLOAD_FOLDER,
  queryEntries: ['sys.id=.'],
}

module.exports = settings;
