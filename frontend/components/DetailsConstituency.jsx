import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export default function DetailsConstituency({ isOpen, onClose }) {
  const [data, setData] = useState({
    name: "",
    party: "",
    age: "",
    constituency: "",
  });

  useEffect(() => {
    if (isOpen) {
      setData({ name: "", party: "", age: "", constituency: "" }); // Reset form when modal opens
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Hi");
      const userData = {
        name: data.name,
        party: data.party,
        age: data.age,
        constituency: data.constituency,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/candidate",
        userData
      );
      console.log(response);
      onClose();
    } catch (error) {
      console.log("ERR");
      console.log(error);
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Constituency Details
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Name"
              placeholder="Enter Candidate Name"
              variant="bordered"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <Input
              label="Party"
              placeholder="Enter Party Name"
              variant="bordered"
              name="party"
              value={data.party}
              onChange={handleChange}
            />
            <Input
              label="Age"
              placeholder="Enter age"
              variant="bordered"
              name="age"
              value={data.age}
              onChange={handleChange}
            />
            <Input
              label="Constituency"
              placeholder="Enter Constituency"
              variant="bordered"
              name="constituency"
              value={data.constituency}
              onChange={handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
