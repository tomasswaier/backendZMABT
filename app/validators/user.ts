import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(2).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  username : vine.string().unique({table : 'users', column : 'username'}),
  email : email().unique({table : 'users', column : 'email'}),
  password : password(),
  passwordConfirmation : password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  username : vine.string().trim(),
  password : vine.string(),
})
