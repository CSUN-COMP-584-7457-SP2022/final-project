const assert = require('assert');
const debug = require('debug')('tdc:ml');
const { json } = require('micro');
const axios = require('axios').default;

const { makeApiError } = require('../../../lib/make-api-error');
const { validate } = require('../../../lib/validate');
const { authorize, authenticate } = require('../../auth');

// Normalization Functions
function _normalizeBodyMassIndex(value) {
  return (value - 12) / 43;
}
function _normalizeGeneralHeathRating(value) {
  return (value - 1) / 4;
}
function _normalizeAgeCategory(value) {
  return (value - 1) / 12;
}
function _normalizeEducationLevel(value) {
  return (value - 1) / 5;
}
function _normalizeIncomeLevel(value) {
  return (value - 1) / 7;
}

async function ml(params, context, {} = {}) {
  validate(
    {
      type: 'object',
      required: [
        'sex',
        'ageCategory',
        'educationLevel',
        'incomeLevel',
        'hasHighBloodPressure',
        'hasHighCholesterol',
        'hadCholesterolCheckLastFiveYears',
        'hasHealthCare',
        'couldntAffordDoctorVisit',
        'bodyMassIndex',
        'generalHeathRating',
        'isHeavyDrinker',
        'isSmoker',
        'hadStroke',
        'hasHeartDiseaseOrAttack',
        'hasDifficultyWithStairs',
        'isPhysicallyActive',
        'eatsFruits',
        'eatsVegetables',
      ],
      properties: {
        sex: {
          type: 'number',
        },
        ageCategory: {
          type: 'number',
        },
        educationLevel: {
          type: 'number',
        },
        incomeLevel: {
          type: 'number',
        },

        hasHighBloodPressure: {
          type: 'number',
        },
        hasHighCholesterol: {
          type: 'number',
        },
        hadCholesterolCheckLastFiveYears: {
          type: 'number',
        },
        hasHealthCare: {
          type: 'number',
        },
        couldntAffordDoctorVisit: {
          type: 'number',
        },
        bodyMassIndex: {
          type: 'number',
        },
        generalHeathRating: {
          type: 'number',
        },

        isHeavyDrinker: {
          type: 'number',
        },
        isSmoker: {
          type: 'number',
        },
        hadStroke: {
          type: 'number',
        },
        hasHeartDiseaseOrAttack: {
          type: 'number',
        },
        hasDifficultyWithStairs: {
          type: 'number',
        },
        isPhysicallyActive: {
          type: 'number',
        },
        eatsFruits: {
          type: 'number',
        },
        eatsVegetables: {
          type: 'number',
        },
      },
    },
    params
  );

  assert(context.user && context.user.id, makeApiError(422, 'Invalid user'));

  authorize('ml', context, {});

  // Formatting our params to a data frame that our ml service expects
  const dataFrame = [
    params.hasHighBloodPressure, // HighBP
    params.hasHighCholesterol, // HighChol
    params.hadCholesterolCheckLastFiveYears, // CholCheck
    params.bodyMassIndex, // BMI
    params.isSmoker, // Smoker
    params.hadStroke, // Stroke
    params.hasHeartDiseaseOrAttack, // HeartDiseaseorAttack
    params.isPhysicallyActive, // PhysActivity
    params.eatsFruits, // Fruits
    params.eatsVegetables, // Veggies
    params.isHeavyDrinker, // HvyAlcoholConsump
    params.hasHealthCare, // AnyHealthcare
    params.couldntAffordDoctorVisit, // NoDocbcCost
    params.generalHeathRating, // GenHlth
    params.hasDifficultyWithStairs, // DiffWalk
    params.sex, // Sex
    params.ageCategory, // Age
    params.educationLevel, // Education
    params.incomeLevel, // Income
  ];

  // Formatting our params to a data frame that our ml service expects
  const normalizedDataFrame = [
    params.hasHighBloodPressure, // HighBP
    params.hasHighCholesterol, // HighChol
    params.hadCholesterolCheckLastFiveYears, // CholCheck
    _normalizeBodyMassIndex(params.bodyMassIndex), // BMI
    params.isSmoker, // Smoker
    params.hadStroke, // Stroke
    params.hasHeartDiseaseOrAttack, // HeartDiseaseorAttack
    params.isPhysicallyActive, // PhysActivity
    params.eatsFruits, // Fruits
    params.eatsVegetables, // Veggies
    params.isHeavyDrinker, // HvyAlcoholConsump
    params.hasHealthCare, // AnyHealthcare
    params.couldntAffordDoctorVisit, // NoDocbcCost
    _normalizeGeneralHeathRating(params.generalHeathRating), // GenHlth
    params.hasDifficultyWithStairs, // DiffWalk
    params.sex, // Sex
    _normalizeAgeCategory(params.ageCategory), // Age
    _normalizeEducationLevel(params.educationLevel), // Education
    _normalizeIncomeLevel(params.incomeLevel), // Income
  ];

  const data = {
    params,
    dataFrame,
    normalizedDataFrame,
  };

  const errors = [];

  const {
    data: {
      data: { prediction },
    },
  } = await axios.post('http://127.0.0.1:5000', JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { data: { ...data, prediction }, errors };
}

exports.POST = async (req) => ml(await json(req), await authenticate(req));
