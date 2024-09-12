"use client"
import { useState } from "react"; 
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Slider } from "./ui/Slider";
import { Switch } from "./ui/Switch";
import { crackSizes } from "../lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

export default function NewCrackTrainerModal({ open, setOpen }) {
  const [name, setName] = useState("")
  const [length, setLength] = useState(16)
  const [hasLapButtons, setHasLapButtons] = useState(false)
  const [hasLogbook, setHasLogbook] = useState(false)
  const [toggledCircles, setToggledCircles] = useState({})

  const handleToggle = (colorName) => {
    setToggledCircles(prev => ({
      ...prev,
      [colorName]: !prev[colorName]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, length, hasLapButtons, hasLogbook })
    setOpen(false)
    // Reset form
    setName("")
    setLength(16)
    setHasLapButtons(false)
    setHasLogbook(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Crack Trainer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter crack trainer name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Length (ft)</Label>
            <Slider
              id="length"
              min={6}
              max={50}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {length} ft
            </div>
          </div>
          <div className="flex flex-col space-y-2 pb-4">
            <Label>Crack sizes</Label>
            <div className="flex flex-row space-x-4">
              {crackSizes.map((size) => (
                <div
                  key={size.name}
                  pressed={toggledCircles[size.name]}
                  onClick={() => handleToggle(size.name)}
                  className={`
                    cursor-pointer w-10 h-10 rounded-full transition duration-300
                    ${size.color} hover:opacity-80
                    ${toggledCircles[size.name] ? 'opacity-100 ring-2 ring-neutral-600' : 'opacity-50'}
                  `}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row">
            <Label htmlFor="lap-buttons">Has lap buttons</Label>
            <Switch
              className="ml-auto"
              id="lap-buttons"
              checked={hasLapButtons}
              onCheckedChange={setHasLapButtons}
            />
          </div>
          <div className="flex flex-row">
            <Label htmlFor="logbook">Has logbook</Label>
            <Switch
              className="ml-auto"
              id="logbook"
              checked={hasLogbook}
              onCheckedChange={setHasLogbook}
            />
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full">
              Create Crack Trainer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}