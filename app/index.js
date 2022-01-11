const fs = require('fs');
const settings = require('../config/settings');
const { migrateAll } = require('./migration');

const validate = () => {
  if (!typeof settings.FROM_ENVIRONMENT === 'string')
    throw Error('"FROM_ENVIRONMENT" in config.yml required as valid string');
  if (
    !(settings.TO_ENVIRONMENT instanceof Array) ||
    !(settings.TO_ENVIRONMENT.length > 0)
  )
    throw Error('Invalid destination');
};

const main = async () => {
  await validate();

  // get flag
  const flag = process.argv[2];

  // select method
  if (flag === '--all') await migrateAll();

  // clean static files
  await fs.rmSync(settings.DOWNLOAD_FOLDER, {
    recursive: true,
    force: true,
  });
};

main();

