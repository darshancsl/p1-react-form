import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dasboard = () => {
  const [userDetails, setUserDetails] = useState([]);
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "70vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "70vh" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "username", filter: true, minWidth: 80 },
    { field: "email", filter: true, minWidth: 80 },
    { field: "tags", minWidth: 80 },
  ]);

  const dataFromLS = useMemo(
    () => JSON.parse(localStorage.getItem("userDetails")),
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      floatingFilter: true,
    }),
    []
  );

  const onFirstDataRendered = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onDeleteButtonClick = (rowId) => {
    const updatedUserDetails = userDetails.filter(
      (user) => user.username !== rowId
    );
    setUserDetails(updatedUserDetails);
    localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
  };

  const updatedColumnDefs = [
    ...columnDefs,
    {
      headerName: "Action",
      field: "action",
      minWidth: 100,
      cellRenderer: (params) => {
        const { username } = params.data;
        return (
          <button
            style={{
              backgroundColor: "red",
              padding: "0px 10px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => onDeleteButtonClick(username)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    setUserDetails(dataFromLS);
  }, [dataFromLS]);

  return (
    <>
      <h1 className='fw-bold text-center py-5'>User Details</h1>
      {userDetails && (
        <div className='ag-theme-alpine' style={containerStyle}>
          <AgGridReact
            style={gridStyle}
            ref={gridRef}
            columnDefs={updatedColumnDefs}
            defaultColDef={defaultColDef}
            rowData={userDetails}
            onFirstDataRendered={onFirstDataRendered}
            animateRows={true}
            rowSelection='multiple'
          />
        </div>
      )}
    </>
  );
};

export default Dasboard;
