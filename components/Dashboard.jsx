"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { UserCircle } from "lucide-react";
import ClimbCard from "./ClimbCard";
import TrainerInfoCard from "./TrainerInfoCard";
import LogsCard from "./LogsCard";
import UsersCard from "./UsersCard";
import CrackTrainerSelect from "./CrackTrainerSelect";
import NewCrackTrainerModal from "./NewCrackTrainerModal";
import { getAuth, signOut } from "firebase/auth";
import { app } from "/lib/firebase/config";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export default function Dashboard({ trainers }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/");
  }

  console.log(trainers);

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
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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