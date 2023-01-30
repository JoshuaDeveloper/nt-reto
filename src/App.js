import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import React from "react";
import "./App.css";
import "styled-components";
import { CSVLink } from "react-csv";
import styled from "@emotion/styled";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name.first,
    label: "Nombre",
    key: "first",
  },
  {
    name: "Apellido",
    selector: (row) => row.name.last,
    label: "Apellido",
    key: "last",
  },
  {
    name: "Edad",
    selector: (row) => row.dob.age,
    label: "Edad",
    key: "age",
  },
  {
    name: "Género",
    selector: (row) => row.gender,
    label: "Género",
    key: "gender",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    label: "Email",
    key: "email",
  },
  {
    name: "Nacionalidad",
    selector: (row) => row.nat,
    label: "Nacionalidad",
    key: "nat",
  },
  {
    name: "Foto",
    selector: (row) => (
      <img src={row.picture.thumbnail} alt={row.picture.thumbnail} />
    ),
    label: "Foto",
    key: "thumbnail",
  },
];

const conditionalRowStyles = [
  {
    when: (row) => row.dob.age < 300,
    style: {
      backgroundColor: "#D9E1F2",
      color: "black",
      fontSize: "16px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CSVLinkStyled = styled(CSVLink)`
  text-decoration: none;
  height: 100px;
  color: white;
  background-color: green;
  border: solid 1px black;
  margin-left: 22px;
  border-radius: 8px;
  padding-inline: 16px;
`;

function App() {
  const [data, setData] = useState([]);
  const [dataExport, setDataExport] = useState([]);

  //Llamar a la Api
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=15")
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  // Data para exportar
  useEffect(() => {
    const newData = data.map((x) => ({
      first: x.name.first,
      last: x.name.last,
      age: x.dob.age,
      gender: x.gender,
      email: x.email,
      nat: x.nat,
      thumbnail: x.picture.thumbnail,
    }));
    newData.sort((a, b) => {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    });
    console.log(newData);
    setDataExport(newData);
  }, [data]);

  return (
    <div>
      <HeaderStyled>
        <div>
          <h1>LISTA DE USUARIOS</h1>
        </div>
        <div>
          <CSVLinkStyled
            headers={columns}
            data={dataExport}
            filename="USUARIOS"
            target="_blank"
            separator={";"}
          >
            Exportar en csv
          </CSVLinkStyled>
        </div>
      </HeaderStyled>

      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={3}
        // conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}

export default App;
