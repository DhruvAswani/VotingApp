import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../src/MyContext";

export default function ViewDetailsTable() {
  const [candidates, setCandidates] = useState([
    { name: 1, party: "Item 1", age: "Value 1", constituency: "val1", _id: 1 },
  ]);
  const { text, setText } = useContext(MyContext);

  const getDetails = async () => {
    try {
      const constituency = text;
      console.log(constituency);
      const response = await axios.get(
        `http://127.0.0.1:3000/candidate/list/${constituency}`
      );
      console.log(response);
      console.log(text);
      setCandidates(response.data.response);
    } catch (error) {
      console.log("err");
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("start");
    getDetails();
    console.log("finish");
  }, []);

  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Party</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Votes</TableColumn>
      </TableHeader>

      <TableBody items={candidates}>
        {candidates.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.party}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.votecount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
