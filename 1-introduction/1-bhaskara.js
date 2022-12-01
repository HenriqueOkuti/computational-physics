import { faker } from '@faker-js/faker';

for (let i = 0; i < 5; i++) {
  const COEF_A = faker.datatype.number({
    min: -100,
    max: 100,
  });
  const COEF_B = faker.datatype.number({
    min: -100,
    max: 100,
  });
  const COEF_C = faker.datatype.number({
    min: -100,
    max: 100,
  });

  console.log(
    `Using: ${COEF_A}x² ${COEF_B < 0 ? COEF_B : `+ ${COEF_B}`}x ${
      COEF_C < 0 ? COEF_C : `+ ${COEF_C}`
    }`
  );

  console.log('Calculate Bhaskara: ');
  console.log(calculateBhaskaraRoots(COEF_A, COEF_B, COEF_C));
}

function calculateBhaskaraRoots(COEF_A, COEF_B, COEF_C) {
  const returnObject = {
    validCoef: false,
    imaginaryRoot: false,
    doubleRoot: undefined,
    degreeEQ: 0,
    ROOT_1: null,
    ROOT_2: null,
  };

  if (COEF_A === 0 && COEF_B === 0) {
    //y = C
    return returnObject;
  }

  returnObject.validCoef = true;
  const DELTA = COEF_B ** 2 - 4 * COEF_A * COEF_C;

  if (DELTA < 0) {
    //imaginary roots
    returnObject.imaginaryRoot = true;
    return returnObject;
  }

  returnObject.degreeEQ = 1;

  if (COEF_A === 0) {
    const ROOT = -(COEF_C / COEF_B);
    returnObject.ROOT_1 = ROOT;
    return returnObject;
  }

  returnObject.degreeEQ = 2;
  returnObject.doubleRoot = false;

  const SQRT_DELTA = Math.sqrt(DELTA);

  let ROOT_1, ROOT_2;

  if (COEF_B < 0) {
    ROOT_1 = (-COEF_B + SQRT_DELTA) / (2 * COEF_A);
  } else {
    ROOT_1 = (-COEF_B - SQRT_DELTA) / (2 * COEF_A);
  }

  ROOT_2 = COEF_C / (COEF_A * ROOT_1);

  if (ROOT_1 !== ROOT_2) {
    returnObject.ROOT_1 = ROOT_1;
    returnObject.ROOT_2 = ROOT_2;
    return returnObject;
  } else {
    returnObject.doubleRoot = true;
    returnObject.ROOT_1 = ROOT_1;
    returnObject.ROOT_2 = ROOT_2;
    return returnObject;
  }
}
