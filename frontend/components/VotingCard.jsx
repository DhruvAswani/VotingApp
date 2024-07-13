import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Voting from "./Voting";

export default function VotingCard() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
          Your Constituency is Mumbai-NorthEast
        </p>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Voting />
      </CardBody>
    </Card>
  );
}
