"use client";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { IGithub } from "@/types/github";

export default function UserTable({ user }: { user: IGithub }) {
  return (
    <TableRow className="divide-x-[0.5px]">
      <TableCell className="table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="48"
          src={user?.avatarUrl ?? "/placeholder-user.jpg"}
          width="48"
        />
      </TableCell>
      <TableCell className="font-medium">{user?.githubId}</TableCell>
      <TableCell className="font-medium">{user?.username}</TableCell>
      <TableCell className="font-medium">{user?.name}</TableCell>
      <TableCell>{user?.bio}</TableCell>
      <TableCell className="table-cell">{user?.location}</TableCell>
    </TableRow>
  );
}
