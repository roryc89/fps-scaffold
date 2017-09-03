// work in progress. The idea will be to update the bullet locations
// and broadcast these to clients so that they can see them.
// Then take off clients when it hits them.
const raf = require('raf');

const NS_PER_SEC = 1e9;
const BULLET_LIFETIME = 2; // in seconds

let shots = []

const get = () => shots;

const push = (shot) =>
  shots.push(shot);

const updateShots = () => {
  const now = process.hrtime();
  shots = deleteExpiredShots(now);
  // udpateShotLocations(now);
  raf(updateShots);
};

const deleteExpiredShots = (now) =>
  shots.filter((s) =>
    getTimeDifference(now, s.createdAt) < BULLET_LIFETIME
  )

const getTimeDifference = (ht1, ht2) =>
  hrTimeToSecs(ht1) - hrTimeToSecs(ht2);

const hrTimeToSecs = (ht) => ht[0] + (ht[1] / NS_PER_SEC);

raf(updateShots);

module.exports = {
  get,
  push
};
