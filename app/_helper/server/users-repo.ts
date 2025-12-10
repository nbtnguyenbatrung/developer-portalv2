// src/_helpers/server/user-repo.ts
import { USER_STATUS } from '@/app/constant/constant'
import { Role } from '@/app/model/Role'
import { IUserDoc, User } from '@/app/model/User'
import { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import speakeasy from 'speakeasy'

export interface CreateUserDTO {
  email: string
  password: string
  firstName: string
  lastName: string
  fullName: string
  status: string
  active: boolean
  role?: string[] // mặc định ['guest']
}

export interface UpdateUserDTO {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  fullName?: string
  status?: string
  isDeleting?: boolean
  role?: string[]
}

export const userRepo = {
  create,
  register,
  findAll,
  findById,
  updateById,
  deleteById,
  activeUser: activeStatusUser,
  resetPassword,
  changePassword,
  findUserIdByEmail,
}

function getSecret2FA(email: string) {
  const generatedSecret = speakeasy.generateSecret({
    name: email,
    issuer: process.env.NEXT_APP_NAME || 'MIS Open Banking',
  })

  return generatedSecret.base32
}

async function create(data: CreateUserDTO): Promise<IUserDoc> {
  if (await User.findOne({ email: data.email, status: USER_STATUS.ACTIVE })) {
    throw 'Email "' + data.email + '" is already taken'
  }

  const secret = getSecret2FA(data.email)

  const user = new User({
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    status: USER_STATUS.INACTIVE,
    role: data.role,
    twoFactorSecret: secret,
  })
  return user.save()
}

async function register(data: any): Promise<IUserDoc> {
  if (await User.findOne({ email: data.email })) {
    throw 'Email "' + data.email + '" is already taken'
  }

  // Tìm role có code = "guest"
  // const guestRole = await Role.findOne({ code: "guest" });
  // if (!guestRole) {
  //   throw 'Default role "guest" not found';
  // }

  const secret = getSecret2FA(data.email)

  const user = new User({
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    status: USER_STATUS.ACTIVE,
    role: ['USER'],
    twoFactorSecret: secret,
  })

  return user.save()
}
/**
 * Lấy danh sách tất cả User (chưa xóa)
 */
async function findAll(): Promise<IUserDoc[]> {
  return User.find().exec()
}

/**
 * Tìm User theo _id
 */
async function findById(id: string): Promise<IUserDoc | null> {
  return User.findById(id).exec()
}

/**
 * Cập nhật User theo _id
 */
async function updateById(
  id: string,
  updateData: UpdateUserDTO,
): Promise<IUserDoc | null> {
  const updateDataWithRole = {
    ...updateData,
    role: Array.isArray(updateData.role) ? updateData.role : [],
    fullName: (updateData.firstName || '') + ' ' + (updateData.lastName || ''),
  }
  return User.findByIdAndUpdate(
    id,
    { $set: updateDataWithRole },
    { new: true },
  ).exec()
}

/**
 * Xóa User theo _id (soft-delete nếu muốn)
 */
async function deleteById(id: string, soft = true): Promise<IUserDoc | null> {
  if (soft) {
    return User.findByIdAndUpdate(
      id,
      { $set: { status: USER_STATUS.INACTIVE } },
      { new: true },
    ).exec()
  }
  return User.findByIdAndDelete(id).exec()
}

async function activeStatusUser(id: string): Promise<IUserDoc> {
  return User.findByIdAndUpdate(
    id,
    { $set: { status: USER_STATUS.ACTIVE } },
    { new: true },
  ).exec()
}

/**
 * Reset a user's password by user id
 * @param id User's id
 * @param newPassword New password to set
 * @returns Updated user document
 */
async function resetPassword(
  id: string,
  newPassword: string,
): Promise<IUserDoc | null> {
  const bcrypt = require('bcryptjs')
  const hashed = bcrypt.hashSync(newPassword, 10)
  return User.findByIdAndUpdate(
    id,
    { $set: { password: hashed } },
    { new: true },
  ).exec()
}

/**
 * Change a user's password by user id
 * @param id User's id
 * @param oldPassword Old password to verify
 * @param newPassword New password to set
 * @returns Updated user document or throws error if old password is incorrect
 */
async function changePassword(
  id: string,
  oldPassword: string,
  newPassword: string,
): Promise<IUserDoc | null> {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')
  const isMatch = await bcrypt.compare(oldPassword, user.password)
  if (!isMatch) throw new Error('Old password is incorrect')
  const hashed = bcrypt.hashSync(newPassword, 10)
  user.password = hashed
  await user.save()
  return user
}

export async function findUserIdByEmail(email: string) {
  if (!email) return null

  const user = await User.findOne({ email }, { _id: 1 }).lean<{
    _id: Types.ObjectId
  }>()

  return user?._id ?? null
}
