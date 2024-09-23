import {
  TextField,
  Checkbox,
  CheckCircle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel
} from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getUsers, updateUser } from "../../../../clientServices/UserService";
import { getRoles } from "../../../../clientServices/RoleService";
import CancelIcon from '@mui/icons-material/Cancel';

const UsersTable = forwardRef((props, ref) => {
  const { onSelectUserInTable } = props;
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleRowClick = (user) => {
    if (selectedUserId === user.ID) {
      setSelectedUserId(null);
      onSelectUserInTable(null);
    } else {
      setSelectedUserId(user.ID);
      onSelectUserInTable(user);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleStatus = async () => {
    const userToToggle = users.find(user => user.ID === selectedUserId);
    if (userToToggle) {
      const updatedUser = { ...userToToggle, Status: !userToToggle.Status };
      console.log(updatedUser)
      try {
        await updateUser(updatedUser.ID, updatedUser);
        setUsers(users.map(user => user.ID === updatedUser.ID ? updatedUser : user));
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleToggleStatus,
  }));

  const filteredUsers = users.filter((user) => {
    const name = (user.Name || '').toLowerCase();

    return (
      name.includes(searchQuery.toLowerCase())
    );
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (orderBy === 'Name') {
      return order === 'asc' ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name);
    } else {
      return order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  const getRoleNameById = (roleId) => {
    const role = roles.find(role => role.ID === roleId);
    return role ? role.Role : 'תפקיד לא קיים';
  };

  return (
    <div>
      <TextField
        label="חיפוש"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">בחירה</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'Name'}
                  direction={orderBy === 'Name' ? order : 'asc'}
                  onClick={() => handleRequestSort('Name')}
                >
                  שם משתמש
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                מייל
              </TableCell>
              <TableCell align="center">
                מספר טלפון
              </TableCell>
              <TableCell align="center">
                תפקיד
              </TableCell>
              <TableCell align="center">
                סטטוס
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow
                key={user.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(user)}
                style={{ cursor: 'pointer' }}
                selected={selectedUserId === user.ID}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedUserId === user.ID}
                    onChange={() => handleRowClick(user)}
                  />
                </TableCell>
                <TableCell align="center">
                  {user.Name}
                </TableCell>
                <TableCell align="center">
                  {user.Email}
                </TableCell>
                <TableCell align="center">
                  {user.Phone}
                </TableCell>
                <TableCell align="center">
                  {getRoleNameById(user.RoleID)}
                </TableCell>
                <TableCell align="center">
                  {user.Status ? <CheckCircle color="success" /> : <CancelIcon color="error" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default UsersTable;
