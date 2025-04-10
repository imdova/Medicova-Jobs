"use client";
const EmployerList: React.FC = () => {
  const API_GET_EMPLOYERS_TABLE_DATA = "/api/employers/table-data";
  return (
    <>
      <div className="box-content !p-0">
        {/* <OverviewEmployersTable
          endPoint={API_GET_EMPLOYERS_TABLE_DATA}
          Filtring={true}
        /> */}
      </div>
    </>
  );
};

export default EmployerList;
