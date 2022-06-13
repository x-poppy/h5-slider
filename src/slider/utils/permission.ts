export enum PermissionKey {
  SubmitSlide = "DisabledSubmitSlide"
}


export interface PermissionManager {
  getPermission(permissionKey: PermissionKey | string, defaultPermission?: boolean): boolean;
}

export function createPermissionManager(permissions: Record<string, any>): PermissionManager {
  return {
    getPermission(permissionKey: PermissionKey | string, defaultPermission?: boolean): boolean {
      if (permissions[permissionKey] === undefined) {
        if (defaultPermission !== undefined) {
          return defaultPermission;
        }

        return false;
      }

      return !!permissions[permissionKey];
    }
  }
}
