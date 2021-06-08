import React, { useEffect, useState } from "react";
import BaseTemplate from "../templates/BaseTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import { User } from "../../api/@type/User";
import { Controller, useForm } from "react-hook-form";
import { getUsers, searchUsers } from "../../api/client/Users";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserPage: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>();
  const { handleSubmit, control } = useForm();

  // test client
  const clientId = 1;

  useEffect(() => {
    getUsers(clientId).then((u) => setUsers(u));
  }, []);

  const onSubmit = (data: any) => {
    searchUsers(clientId, data.searchTextField).then((u) => setUsers(u));
  };

  return (
    <BaseTemplate title="Users">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="searchTextField"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                margin: "10px",
                width: "300px",
              }}
              placeholder="Please enter user's name"
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{
            margin: "10px",
          }}
        >
          Search
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell component="th" scope="row">
                    {u.client?.companyName}
                  </TableCell>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell>{u.lastName}</TableCell>
                  <TableCell>{u.age}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseTemplate>
  );
};

export default UserPage;
