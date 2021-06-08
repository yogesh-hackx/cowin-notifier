const express = require('express');
const moment = require('moment');
const subscribers = require('../../data/subscribers');
const fetchData = require('../../utils/dataFetcher');
const sendNotif = require('../../utils/notifier');

const router = express.Router();

const TO_SEND = [];

const findSlotAndNotify = async (centers, pincode, user) => {
  let slotsFound = 0;
  let exists = false;

  TO_SEND.forEach((item) => (item.user.phone === user.phone ? exists = true : ''));

  let message = !exists ? `Hurry ${user.name}!, following empty slots available for Vaccination:\n\n` : '';
  message = message.concat(`\nPINCODE: ${pincode}\n\n`);
  centers.forEach((center) => {
    const { sessions } = center;

    sessions.forEach((session) => {
      const doses = session.available_capacity_dose1;
      const centerName = center.name;

      if (session.min_age_limit === user.minAge
                && session.available_capacity_dose1 > 2 // it'll be too late if put < 2
                && slotsFound < 5) {
        slotsFound += 1;
        message = message.concat(`${slotsFound}. ${centerName} : (${doses} SLOTS)\n`);
      }
    });
  });
  if (slotsFound) {
    let isAppended = false;
    TO_SEND.map((item) => {
      if (item.user.phone === user.phone) {
        item.message = item.message.concat(message);
        isAppended = true;
      }
    });

    if (!isAppended) {
      TO_SEND.push({
        user,
        message,
      });
    }
    console.log(message);
  }
};

router.get('/', async (req, res) => {
  const date = moment().format('DD-MM-YYYY');

  await Promise.all(subscribers.map(async (user) => {
    await Promise.all(user.pincodes.map(async (pincode) => {
      const centers = await fetchData(pincode, date);
      await findSlotAndNotify(centers, pincode, user);
    }));
  }));

  await Promise.all(TO_SEND.map(async (item) => {
    await sendNotif(item.message, item.user.phone);
  }));

  res.json({ message: 'SUCCESS!' });
});

module.exports = router;
