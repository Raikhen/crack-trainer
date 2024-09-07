"use client";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { UserCircle } from "lucide-react";
import ClimbCard from "../../components/ClimbCard";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import LogsCard from "../../components/LogsCard";
import UsersCard from "../../components/UsersCard";
import CrackTrainerSelect from "../../components/CrackTrainerSelect";
import NewCrackTrainerModal from "../../components/NewCrackTrainerModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-4 bg-background border-b lg:px-6">
        <h1 className="text-xl font-bold sm:text-2xl">Smarty Cracks</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <CrackTrainerSelect openModal={setModalOpen} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Open profile menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="flex-1 space-y-4 sm:space-y-6 lg:w-1/2">
          <ClimbCard />
          <UsersCard />
        </div>
        <div className="flex-1 space-y-4 sm:space-y-6 lg:w-1/2">
          <TrainerInfoCard />
          <LogsCard />
        </div>
      </main>
      <NewCrackTrainerModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  )
}