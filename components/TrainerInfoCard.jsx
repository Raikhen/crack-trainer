import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table"

export default function TrainerInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crack Trainer Info</CardTitle>
      </CardHeader>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Length</TableHead>
            <TableHead>Crack sizes</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Has lap buttons</TableHead>
            <TableHead>Has logbook</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">16 ft</TableCell>
            <TableCell>
              <div className="flex flex-row space-x-2">
                <div className="rounded-full bg-red-600 w-5 h-5"></div>
                <div className="rounded-full bg-yellow-400 w-5 h-5"></div>
                <div className="rounded-full bg-blue-600 w-5 h-5"></div>
                <div className="rounded-full bg-neutral-300 w-5 h-5"></div>
                <div className="rounded-full bg-purple-600 w-5 h-5"></div>
                <div className="rounded-full bg-green-600 w-5 h-5"></div>
              </div>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  );
}