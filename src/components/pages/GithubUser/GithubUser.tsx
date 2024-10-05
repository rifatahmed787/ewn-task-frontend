
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import UserTable from "@/components/ui/UserTable";
import { IGithub } from "@/types/github";
  import React from "react";
  interface IUserResponse {
    data: {
      data: IGithub[];
    };
  }
  
  interface IUsersProps {
    users: IUserResponse;
  }
  
  const GithubUser: React.FC<IUsersProps> = ({ users }) => {
    
    return (
      <div className="rounded-md border -mx-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" w-[100px] table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Github Id</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="table-cell">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.data?.map((user: IGithub) => (
              <UserTable key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default GithubUser;
  