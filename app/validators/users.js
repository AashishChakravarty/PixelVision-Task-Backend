const { check } = require('express-validator');
const strConstants = require('../utils/constant_strings');
const helper = require('../utils/helper');
const {
  FIRST_NAME_REGEX,
  FAMILY_NAME_REGEX,
  USER_NAME_REGEX,
  PASSWORD_MANDATORY_CHECK_REGEX,
  PASSWORD_CHARS_REGEX
} = require('../constants/user_constants');
const {
  APPLICATION: { NAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH }
} = require('../../config');
const i18next = require('i18next');
const { LCID } = require('../constants/general_settings_constants');

const validateCreateUser = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage(USER.FULL_NAME.MESSAGE.EMPTY),
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage(strConstants.INVALID_EMAIL),
  // .custom(async (email) => {
  //   const existingUser =
  //     await repo.getOneBy({ email })

  //   if (existingUser) {
  //     throw new Error('Email already in use')
  //   }
  // }),
  check('password')
    .trim()
    .isLength({
      min: USER.PASSWORD.MIN_LENGTH,
      max: USER.PASSWORD.MAX_LENGTH,
    })
    .withMessage(USER.PASSWORD.MESSAGE.LENGTH)
];

const usernameValidator = [
  check('username')
    .exists()
    .withMessage(strConstants.EMPTY_USER_NAME)
    .isString()
    .withMessage(strConstants.INVALID_USER_NAME),
  check('userIdentifier')
    .optional()
    .isMongoId()
    .withMessage(strConstants.INVALID_MONGO_ID)
];

const validateUserIdentifier = [
  check('userIdentifier')
    .exists()
    .withMessage(strConstants.EMPTY_MONGO_ID)
    .isMongoId()
    .withMessage(strConstants.INVALID_MONGO_ID)
];

const validateResetPassword = [
  check('userIdentifier')
    .exists()
    .withMessage(strConstants.EMPTY_MONGO_ID)
    .isMongoId()
    .withMessage(strConstants.INVALID_MONGO_ID),
  check('password')
    .exists()
    .withMessage(strConstants.EMPTY_USER_PASSWORD)
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(() =>
      i18next.t(strConstants.PASSWORD_LENGTH, {
        minLength: PASSWORD_MIN_LENGTH,
        maxLength: PASSWORD_MAX_LENGTH
      })
    )
    .matches(PASSWORD_CHARS_REGEX)
    .withMessage(strConstants.PASSWORD_ALLOWED_CHAR_ERROR)
    .matches(PASSWORD_MANDATORY_CHECK_REGEX)
    .withMessage(strConstants.PASSWORD_MANDATORY_CHECK_ERROR)
];

const validateUpdateUser = [
  check('userIdentifier')
    .exists()
    .withMessage(strConstants.EMPTY_MONGO_ID)
    .isMongoId()
    .withMessage(strConstants.INVALID_MONGO_ID),
  check('firstName')
    .exists()
    .withMessage(strConstants.EMPTY_USER_FIRST_NAME)
    .isString()
    .withMessage(strConstants.INVALID_USER_FIRST_NAME)
    .isLength({ min: 1, max: NAME_MAX_LENGTH })
    .withMessage(() => i18next.t(strConstants.USER_FIRST_NAME_MAX_LENGTH, { maxLength: NAME_MAX_LENGTH }))
    .matches(FIRST_NAME_REGEX)
    .withMessage(strConstants.USER_FIRST_NAME_REGEX_ERROR),
  check('familyName')
    .exists()
    .withMessage(strConstants.EMPTY_USER_FAMILY_NAME)
    .isString()
    .withMessage(strConstants.INVALID_USER_FAMILY_NAME)
    .isLength({ min: 1, max: NAME_MAX_LENGTH })
    .withMessage(() => i18next.t(strConstants.USER_FAMILY_NAME_MAX_LENGTH, { maxLength: NAME_MAX_LENGTH }))
    .matches(FAMILY_NAME_REGEX)
    .withMessage(strConstants.USER_FAMILY_NAME_REGEX_ERROR),
  check('emailId')
    .custom(value => helper.isEmpty(value) || helper.isValidEmail(value))
    .withMessage(strConstants.INVALID_EMAIL),
  check('username')
    .exists()
    .withMessage(strConstants.EMPTY_USER_NAME)
    .isString()
    .withMessage(strConstants.INVALID_USER_NAME)
    .isLength({ min: 1, max: NAME_MAX_LENGTH })
    .withMessage(() => i18next.t(strConstants.USER_NAME_MAX_LENGTH, { maxLength: NAME_MAX_LENGTH }))
    .matches(USER_NAME_REGEX)
    .withMessage(strConstants.USER_NAME_REGEX_ERROR),
  check('password')
    .optional()
    .custom(value => helper.isEmpty(value) || helper.isValidPassword(value)),
  check('groupIds')
    .exists()
    .withMessage(strConstants.EMPTY_MONGO_IDS)
    .isArray()
    .withMessage(strConstants.INVALID_MONGO_IDS)
    .custom(value => {
      let groupIds = helper.getValidObjectIds(value);
      return helper.isNotEmpty(value) && value.length === groupIds.length ? true : false;
    })
    .withMessage(strConstants.FOUND_INVALID_MONGO_ID),
  check('preferences[*].lcid')
    .optional()
    .isIn(Object.values(LCID))
    .withMessage(strConstants.INVALID_LCID)
];

module.exports = {
  validateCreateUser,
  usernameValidator,
  validateUserIdentifier,
  validateResetPassword,
  validateUpdateUser
};
