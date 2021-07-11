function msgValidator(req, res, next) {
  const { msg_name, msg_date, msg_content } = req.body.msg;

  if (!msg_name || !msg_date || !msg_content) {
    res.status(422).send(`The following fields are missing: 
        ${!msg_name ? "msg_name, " : ""}
        ${!msg_date ? "mag_date, " : ""}
        ${!msg_content ? "msg_content" : ""}
        `);
  } else {
    const validationErrors = [];

    //name validation
    if (typeof msg_name === "string") {
      if (!_checkMinLength(msg_name, 3)) {
        validationErrors.push(
          `"msg_name" length must be greater then 3 chars inclusive`
        );
      }
      if (!_checkMaxLength(msg_name, 10)) {
        validationErrors.push(
          `"msg_name" length must be shorter then 10 chars inclusive`
        );
      }
      if (_checkSpaces(msg_name)) {
        validationErrors.push(
          `"msg_name" must not have trailing or leading spaces`
        );
      }
    } else {
      validationErrors.push(`"msg_name" must be type String`);
    }

    // date validation
    if (!_isDate(msg_date)) {
      validationErrors.push(`"msg_date" must be type "Date"`);
    }
    if (!_isLaterThenToday(msg_date)) {
      validationErrors.push(`"msg_date" must be later then today's date`);
    }

    //content validation
    if (!typeof msg_content === "string") {
      validationErrors.push(`"msg_content" must be type String`);
    }
    if (!_checkMinLength(msg_content, 15)) {
      validationErrors.push(
        `"msg_content" length must be greater then 15 chars inclusive`
      );
    }

    if (validationErrors.length === 0) {
      next();
    } else {
      const errorsStr = validationErrors
        .map((err) => {
          return "Validation error - " + err;
        })
        .join("\n");
      res.status(422).send(errorsStr);
    }
  }
}

function _checkMinLength(str, minLength) {
  return str.length >= minLength;
}

function _checkMaxLength(str, maxLength) {
  return str.length <= maxLength;
}

function _checkSpaces(str) {
  const hasTrailingSpaces = str.charAt(0) === " ";
  const hasLeadingSpaces = str.charAt(str.length - 1) === " ";
  return hasTrailingSpaces || hasLeadingSpaces;
}

function _isDate(dateToValidate) {
  return new Date(dateToValidate) instanceof Date;
}

function _isLaterThenToday(dateToValidate) {
  return new Date(dateToValidate) > new Date();
}

module.exports = {
  msgValidator,
};
