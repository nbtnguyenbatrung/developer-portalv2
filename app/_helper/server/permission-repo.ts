// src/repositories/permission.repository.ts
import mongoose from "mongoose";
import { IPermission, Permission } from "@/app/model/Permission";

export interface CreatePermissionDTO {
  code: string;
  name: string;
  active: boolean;
}

export const permissionRepo = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};

/**
 * Tạo mới Permission
 */
async function create(data: CreatePermissionDTO): Promise<IPermission> {
  try {
    const permission = new Permission({
      code: data.code,
      name: data.name,
      active: data.active,
    });
    const newPerm = await permission.save();
    return newPerm;
  } catch (error) {
    throw new Error("Error creating permission: " + error);
  }
}

/**
 * Lấy tất cả Permission
 */
async function findAll(): Promise<IPermission[]> {
  return Permission.find({ active: true }).exec();
}

async function findById(id: string): Promise<IPermission | null> {
  return Permission.findById(id).exec();
}

async function updateById(
  id: string,
  updateData: Partial<Pick<IPermission, "code" | "name">>
): Promise<IPermission | null> {
  return Permission.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  ).exec();
}

async function deleteById(id: string): Promise<IPermission | null> {
  return Permission.findByIdAndDelete(id).exec();
}
