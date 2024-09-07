"use client"

import { useState } from "react"; 
import { Button } from "./ui/Button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Slider } from "./ui/Slider";
import { Switch } from "./ui/Switch";

const ColorCircle = ({ color, bgColor, selected, onClick }) => (
  <button
    className={`w-8 h-8 rounded-full border-2 ${selected ? 'border-gray-400' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary`}
    style={{ backgroundColor: bgColor }}
    onClick={onClick}
    aria-label={`Select ${color}`}
    aria-pressed={selected}
  />
)

export default function NewCrackTrainerModal({ open, setOpen }) {
  const [name, setName] = useState("")
  const [length, setLength] = useState(25)
  const [hasLapButtons, setHasLapButtons] = useState(false)
  const [hasLogbook, setHasLogbook] = useState(false)
  const [colorCircles, setColorCircles] = useState([
    { color: "Red", bgColor: "#EF4444", selected: false },
    { color: "Blue", bgColor: "#3B82F6", selected: false },
    { color: "Green", bgColor: "#10B981", selected: false },
    { color: "Yellow", bgColor: "#FBBF24", selected: false },
    { color: "Purple", bgColor: "#8B5CF6", selected: false },
    { color: "Pink", bgColor: "#EC4899", selected: false },
  ])

  const handleColorToggle = (index) => {
    setColorCircles(circles =>
      circles.map((circle, i) =>
        i === index ? { ...circle, selected: !circle.selected } : circle
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedColors = colorCircles.filter(circle => circle.selected).map(circle => circle.color)
    console.log({ name, length, hasLapButtons, hasLogbook, selectedColors })
    setOpen(false)
    // Reset form
    setName("")
    setLength(25)
    setHasLapButtons(false)
    setHasLogbook(false)
    setColorCircles(circles => circles.map(circle => ({ ...circle, selected: false })))
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
              min={1}
              max={50}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {length} ft
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="lap-buttons"
              checked={hasLapButtons}
              onCheckedChange={setHasLapButtons}
            />
            <Label htmlFor="lap-buttons">Has Lap Buttons</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="logbook"
              checked={hasLogbook}
              onCheckedChange={setHasLogbook}
            />
            <Label htmlFor="logbook">Has Logbook</Label>
          </div>
          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="flex justify-between">
              {colorCircles.map((circle, index) => (
                <ColorCircle
                  key={circle.color}
                  {...circle}
                  onClick={() => handleColorToggle(index)}
                />
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create Crack Trainer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}