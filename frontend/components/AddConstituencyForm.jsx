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

export default function AddConstituencyForm({
  isOpen,
  onClose,
  onAddConstituency,
}) {
  const [data, setData] = useState({
    name: "",
    state: "",
  });

  useEffect(() => {
    if (isOpen) {
      setData({ name: "", state: "" }); // Reset form when modal opens
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
      const userData = {
        name: data.name,
        state: data.state,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/constituency/addconstituency",
        userData
      );
      if (response.status === 200) {
        onAddConstituency(response.data); // Pass the new constituency data to the parent
        onClose(); // Close the modal
      }
    } catch (error) {
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
            Add Constituency
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Constituency"
              placeholder="Enter Constituency name"
              variant="bordered"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <Input
              label="State"
              placeholder="Enter state name"
              variant="bordered"
              name="state"
              value={data.state}
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
