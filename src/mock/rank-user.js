import {getRandomIntegerNumber} from "../utils/common.js";
import {USER_RANK} from "../const.js";

const generateRank = () => {
  const rating = getRandomIntegerNumber(0, 25);
  let currentRating = ``;

  if (rating >= 1 && rating <= 10) {
    currentRating = USER_RANK[0];
  } else if (rating >= 11 && rating <= 20) {
    currentRating = USER_RANK[1];
  } else if (rating >= 21) {
    currentRating = USER_RANK[2];
  }

  return currentRating;
};

export {generateRank};
