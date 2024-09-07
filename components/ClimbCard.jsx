"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Input } from "./ui/Input";

export default function ClimbCard() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isClimbing, setIsClimbing] = useState(false);

  const handleClimb = () => {
    setIsClimbing(true);
  }

  const handleFinish = () => {
    setIsClimbing(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Climb</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row space-x-2">
          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy Route</SelectItem>
              <SelectItem value="medium">Medium Route</SelectItem>
              <SelectItem value="hard">Hard Route</SelectItem>
            </SelectContent>
          </Select>
          {isClimbing ? (
            <>
              <Input placeholder="# Laps" className="w-24" />
              <Button onClick={handleFinish}>Finish</Button>
            </>
          ) : (
            <Button onClick={handleClimb}>Climb</Button>
          )}
        </div>
        <div className="relative w-full h-64">
          <Image
            src="/placeholder.jpg"
            alt="Climbing route"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
}