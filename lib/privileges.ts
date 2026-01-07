import { UserRole, Privilege, StaffMember } from '../types';

/**
 * Check if a user has a specific privilege
 * Super Admins have all privileges by default
 */
export const hasPrivilege = (
  userRole: UserRole,
  privilege: Privilege,
  staffMember?: StaffMember
): boolean => {
  // Super Admins have all privileges
  if (userRole === UserRole.SUPER_ADMIN) {
    return true;
  }

  // Staff members need explicit privilege assignment
  if (userRole === UserRole.STAFF && staffMember?.privileges) {
    // Compare both as strings to handle any type mismatches
    const privilegeStr = String(privilege);
    return staffMember.privileges.some(p => String(p) === privilegeStr);
  }

  return false;
};

/**
 * Check if a user has any of the specified privileges
 */
export const hasAnyPrivilege = (
  userRole: UserRole,
  privileges: Privilege[],
  staffMember?: StaffMember
): boolean => {
  return privileges.some(privilege => hasPrivilege(userRole, privilege, staffMember));
};

/**
 * Check if a user has all of the specified privileges
 */
export const hasAllPrivileges = (
  userRole: UserRole,
  privileges: Privilege[],
  staffMember?: StaffMember
): boolean => {
  return privileges.every(privilege => hasPrivilege(userRole, privilege, staffMember));
};

/**
 * Get all available privileges with descriptions
 */
export const PRIVILEGE_DESCRIPTIONS: Record<Privilege, { label: string; description: string; category: string }> = {
  [Privilege.MANAGE_MEMBERS]: {
    label: 'Manage Members',
    description: 'Add, edit, and view member information',
    category: 'Member Management'
  },
  [Privilege.DELETE_MEMBERS]: {
    label: 'Delete Members',
    description: 'Remove members from the system',
    category: 'Member Management'
  },
  [Privilege.MANAGE_PAYMENTS]: {
    label: 'Manage Payments',
    description: 'View and record payment transactions',
    category: 'Payment Management'
  },
  [Privilege.CONFIRM_PAYMENTS]: {
    label: 'Confirm Payments',
    description: 'Approve and confirm pending mobile money payments',
    category: 'Payment Management'
  },
  [Privilege.MANAGE_ANNOUNCEMENTS]: {
    label: 'Manage Announcements',
    description: 'Create, edit, and delete announcements',
    category: 'Content Management'
  },
  [Privilege.VIEW_ACTIVITY_LOGS]: {
    label: 'View Activity Logs',
    description: 'Access system activity and audit logs',
    category: 'System Access'
  },
  [Privilege.VIEW_ALL_ATTENDANCE]: {
    label: 'View All Attendance',
    description: 'View attendance records for all staff members',
    category: 'System Access'
  },
  [Privilege.MANAGE_STAFF]: {
    label: 'Manage Staff',
    description: 'Add, edit, and remove staff members',
    category: 'System Access'
  },
  [Privilege.MANAGE_PRIVILEGES]: {
    label: 'Manage Privileges',
    description: 'Assign and revoke privileges for staff members',
    category: 'System Access'
  },
  [Privilege.VIEW_REVENUE_ANALYTICS]: {
    label: 'View Revenue Analytics',
    description: 'Access detailed revenue reports and analytics',
    category: 'Analytics'
  },
  [Privilege.VIEW_TEAM_MONITORING]: {
    label: 'View Team Monitoring',
    description: 'Access team presence and monitoring dashboard',
    category: 'Analytics'
  }
};

/**
 * Get privileges grouped by category
 */
export const getPrivilegesByCategory = (): Record<string, Privilege[]> => {
  const categories: Record<string, Privilege[]> = {};
  
  Object.entries(PRIVILEGE_DESCRIPTIONS).forEach(([privilege, info]) => {
    if (!categories[info.category]) {
      categories[info.category] = [];
    }
    categories[info.category].push(privilege as Privilege);
  });
  
  return categories;
};

