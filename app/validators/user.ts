import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const userId = () => vine.number()
const username = () => vine.string().trim().minLength(2).maxLength(64)
const password = () => vine.string().minLength(2).maxLength(32)
const bio= () => vine.string().maxLength(250)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  username : username().unique({table : 'users', column : 'username'}),
  email : email().unique({table : 'users', column : 'email'}),
  password : password(),
  passwordConfirmation : password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  username : username(),
  password : password(),
})

export const followValidator = vine.create({
  userId : userId().exists({table : 'users', column : 'id'}),
})

export const updateBioValidator = vine.create({
  bio : bio(),
})