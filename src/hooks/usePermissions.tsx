import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPermissions } from "@/store/slices/permissions";
import { fetchRoles } from "@/store/slices/roles";
import { User } from "next-auth";
import { useEffect } from "react";

export const usePermissions = (userType?: User["type"], companyId?: string) => {
  const dispatch = useAppDispatch();
  const { data: permissions } = useAppSelector((state) => state.permissions);
  const { data: roles } = useAppSelector((state) => state.roles);

  useEffect(() => {
    if (userType && permissions.length === 0) {
      dispatch(fetchPermissions(userType));
    }
    if (companyId && roles.length === 0) {
      dispatch(fetchRoles(companyId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userType, companyId]);

  return {
    permissions,
    roles,
  };
};
