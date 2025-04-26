"use client";
// import OverveiwUsersTable from "@/components/UI/Tables/OverveiwUsersTable";
const UserList: React.FC = () => {
  const API_GET_USERS_TABLE_DATA = "/api/Users/table-data";
  return (
    <>
      <div className="box-content !p-0">
        {/* <OverveiwUsersTable
          endPoint={API_GET_USERS_TABLE_DATA}
          Filtring={true}
        /> */}
      </div>
    </>
  );
};

export default UserList;
