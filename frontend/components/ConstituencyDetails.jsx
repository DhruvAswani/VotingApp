import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns } from "../data";
import AddConstituencyForm from "./AddConstituencyForm";
import DetailsConstituency from "./DetailsConstituency";
import ViewDetails from "./ViewDetails";
import { useContext } from "react";
import { MyContext } from "../src/MyContext";
import OpenChart from "./OpenChart";

const ConstituencyDetails = () => {
  const [constituencies, setConstituencies] = useState([]);
  const [name, setName] = useState("");
  const { text, setText } = useContext(MyContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detailDisclosure = useDisclosure();
  const disclosure3 = useDisclosure();
  const chartDisclosure = useDisclosure();

  const getConstituencies = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/constituency/list"
      );
      setConstituencies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (name) => {
    try {
      console.log(name);
      const response = await axios.delete(
        `http://127.0.0.1:3000/constituency/deleteconstituency/${name}`
      );
      console.log(response);
      getConstituencies();
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = async (id, name) => {
    try {
      // console.log(id);
      setText(name);
      disclosure3.onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const editDetails = async () => {
    try {
      detailDisclosure.onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const showChart = async (name) => {
    try {
      setName(name);
      chartDisclosure.onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConstituencies();
  }, []);

  const handleAddConstituency = (newConstituency) => {
    setConstituencies((prevConstituencies) => [
      ...prevConstituencies,
      newConstituency,
    ]);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "name":
        return <User name={item.name}></User>;
      case "state":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Analysis">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Button onClick={() => showChart(item.name)}>Analyze</Button>
              </span>
            </Tooltip>
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => getDetails(item._id, item.name)} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => editDetails()} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(item.name)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Button color="primary" variant="ghost" className="m-4" onPress={onOpen}>
        Add Constituency
      </Button>
      <AddConstituencyForm
        isOpen={isOpen}
        onClose={onClose}
        onAddConstituency={handleAddConstituency}
      />
      <DetailsConstituency
        isOpen={detailDisclosure.isOpen}
        onClose={detailDisclosure.onClose}
      />
      <ViewDetails
        isOpen={disclosure3.isOpen}
        onClose={disclosure3.onClose}
        onOpenChange={disclosure3.onOpenChange}
      />
      <OpenChart
        isOpen={chartDisclosure.isOpen}
        onClose={chartDisclosure.onClose}
        onOpenChange={chartDisclosure.onOpenChange}
        name={name}
      />

      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={constituencies}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ConstituencyDetails;
