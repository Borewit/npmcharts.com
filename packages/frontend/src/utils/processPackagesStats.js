import _ from 'lodash/fp';
import { startOfDay } from 'date-fns';

export const processPackageStats = npmModuleData => {
  const downloads = npmModuleData.downloads.map(entry => ({
    day: startOfDay(entry.day),
    count: entry.downloads,
  }));
  return {
    name: npmModuleData.package,
    // if most recent day has no download count, remove it
    downloads: _.last(downloads).count === 0 ? _.initial(downloads) : downloads,
  };
};

export const processPackagesStats = _.flow(
  _.compact,
  _.map(processPackageStats),
);

export default processPackagesStats;
