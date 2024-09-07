"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/Button"

import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "./ui/Command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/Popover"

import { Separator } from "./ui/Separator";

export default function CrackTainerSelect({ openModal }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [trainers, setTrainers] = React.useState([
    "Mugz",
    "Dartmouth Gym",
    "CABA Bucarelli",
  ])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? trainers.find((trainer) => trainer.toLowerCase() === value.toLowerCase())
            : "Select crack trainer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search crack trainer..." />
          <CommandEmpty>No trainer found.</CommandEmpty>
          <CommandList>
            {trainers.map((trainer) => (
              <CommandItem
                key={trainer}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className="pr-4"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === trainer.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {trainer}
              </CommandItem>
            ))}
            <Separator />
          </CommandList>
          <div className="flex flex-row items-center justify-center py-2 px-4">
            <Button onClick={openModal}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Trainer
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}