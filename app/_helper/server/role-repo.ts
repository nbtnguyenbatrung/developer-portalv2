import { IRole, Role } from "@/app/model/Role";
import { Types } from "mongoose";
import _ from "lodash";

export interface CreateRoleDTO {
  code: string;
  name: string;
  permissions: string[];
  active?: boolean;
}

export interface UpdateRoleDTO {
  code?: string;
  name?: string;
  permissions?: string[];
  active?: boolean;
}

export const roleRepo = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
  setPermissions,
  updateManyPermissions,
  findUniquePermissionsByRoleIds
};
/**
 * Create a new Role. Defaults active = true
 */
async function create(data: CreateRoleDTO): Promise<IRole> {
  const role = new Role({
    code: data.code,
    name: data.name,
    permissions: data.permissions,
    active: data.active ?? true,
  });
  // Save and populate permissions
  const saved = await role.save();
  return saved.populate("permissions");
}

/**
 * Get all Roles. Pass { onlyActive: true } to filter active only
 */
async function findAll(options?: { onlyActive?: boolean }): Promise<IRole[]> {
  const filter: Record<string, any> = {};
  if (options?.onlyActive) filter.active = true;
  return Role.find(filter).populate("permissions").exec();
}

/**
 * Find a Role by its _id
 */
async function findById(id: string): Promise<IRole | null> {
  return Role.findById(id).exec();
}

/**
 * Update a Role by its _id. Returns the updated document.
 */
async function updateById(
  id: string,
  updateData: UpdateRoleDTO
): Promise<IRole | null> {
  return Role.findByIdAndUpdate(id, { $set: { ...updateData } }, { new: true })
    .populate("permissions")
    .exec();
}

/**
 * Delete a Role by its _id. If soft=true, marks active=false
 */
async function deleteById(id: string, soft = false): Promise<IRole | null> {
  if (soft) {
    return updateById(id, { active: false });
  }
  return Role.findByIdAndDelete(id).exec();
}

/**
 * Replace permissions array for a Role
 */
async function setPermissions(
  id: string,
  permissionIds: string[]
): Promise<IRole | null> {
  return Role.findByIdAndUpdate(
    id,
    { $set: { permissions: permissionIds } },
    { new: true }
  ).exec();
}

/**
 * Update permissions for many roles at once
 * @param updates Array of { roleId, permissions }
 * @returns Array of updated roles
 */
async function updateManyPermissions(
  updates: { roleId: string; permissions: string[] }[]
): Promise<IRole[]> {
  const results: IRole[] = [];
  for (const { roleId, permissions } of updates) {
    // Use setPermissions to update each role
    const updated = await setPermissions(roleId, permissions);
    if (updated) results.push(updated);
  }
  return results;
}

/**
 * Get unique permissions from an array of role IDs (deduplicated by permission id)
 * @param roleIds Array of role IDs
 * @returns Array of unique permissions
 */
async function findUniquePermissionsByRoleIds(roleIds: string[]): Promise<any[]> {
  // Find all roles by IDs and populate permissions
  const roles = await Role.find({ _id: { $in: roleIds } }).populate('permissions').exec();
  // Use lodash to flatten and deduplicate by permission id
  return _.uniqBy(
    _.flatMap(roles, (role) => role.permissions || []),
    'id'
  );
}
