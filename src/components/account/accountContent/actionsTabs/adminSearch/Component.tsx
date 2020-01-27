import React, { useState, useEffect, useCallback, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Button, Grow, Typography, Divider, MenuItem, Fade, CircularProgress, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import { SetSearchUserResultCredentials } from '../../../../../types/store/actionsCreators/users/searchResult';
import { Role } from '../../../../../types/store/actionsCreators/mainTypes';
import { FetchUpdateUserRootsCredentials } from '../../../../../types/store/actionsCreators/update/userRoot';

interface AdminSearchProps {
    foundUsers: SetSearchUserResultCredentials[];
    updateUserRootsLoading: boolean;
    updateUserRootsSuccess: boolean;
    findUserByEmailLoading: boolean;
    fetchFindUsersByEmail(credentials: string): any;
    fetchUpdateUserRoots(credentials: FetchUpdateUserRootsCredentials): any;
}

interface SelectedUser {
    id: string;
    email: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: '100%',
        maxHeight: 300,
        overflow: 'auto',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        width: 240,
    },
    textField: {
        marginTop: 10,
        marginBottom: 10,
    },
    searchWrapper: {
        width: 240,
    },
    circularProgress: {
        marginLeft: 10,
    },
}));

const AdminSearch = ({
    foundUsers,
    updateUserRootsLoading,
    updateUserRootsSuccess,
    findUserByEmailLoading,
    fetchFindUsersByEmail,
    fetchUpdateUserRoots,
}: AdminSearchProps) => {
    const classes = useStyles();

    const [textFieldsValue, setTextFieldValue] = useState<string>('');
    const [search, toggleSearch] = useState<boolean>(false);
    const [typing, toggleTyping] = useState<boolean>(false);

    const roles: Role[] = [
        'ADMIN',
        'DEFAULT_USER',
    ];

    const [selectedRole, setSelectedRole] = useState<string>('DEFAULT_USER');
    const [selectedUser, setSelectedUser] = useState<SelectedUser>({ id: '', email: '' });

    const debounced = useRef(_.debounce((value: string) => {
        fetchFindUsersByEmail(value);
        toggleTyping(false);
    },                                  250));

    useEffect(() => debounced.current(textFieldsValue), [textFieldsValue]);
    useEffect(() => toggleTyping(true), [textFieldsValue]);

    return (
        <Box>
            <Typography
                variant="h4"
                color="primary"
                align="center"
            >
                Admin panel
            </Typography>
            <Divider className={classes.divider}/>
            <Button
                className={classes.button}
                color="secondary"
                onClick={() => toggleSearch(!search)}
            >
                {`${!search ? 'Give the roots' : 'Close'}`}
            </Button>
            <Grow
                in={search}
                unmountOnExit
                mountOnEnter
            >
                <div className={classes.searchWrapper}>
                    <TextField
                        className={classes.textField}
                        color="secondary"
                        value={textFieldsValue}
                        onChange={event => {
                            setTextFieldValue(event.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    { (findUserByEmailLoading || typing) &&
                                        <CircularProgress
                                            size="15px"
                                            color="secondary"
                                        />
                                    }
                                </InputAdornment>
                            ),
                        }}
                    />
                    <List className={classes.list}>
                        {foundUsers.map((user: SetSearchUserResultCredentials) => (
                            <ListItem
                                key={user.id}
                                button
                                onClick={() => setSelectedUser({ email: user.email, id: user.id })}
                            >
                                {user.email}
                            </ListItem>
                        ))}
                    </List>
                    <Fade
                        in={selectedUser.id !== ''}
                        mountOnEnter
                        unmountOnExit
                    >
                        <>
                            <Divider className={classes.divider}/>
                            <Typography variant="h5" color="secondary">
                                Selected user:
                            </Typography>
                            <Typography variant="h5">
                                { selectedUser.email }
                            </Typography>
                            <Divider className={classes.divider}/>
                            <TextField
                                className={classes.textField}
                                select
                                color="secondary"
                                value={selectedRole}
                                onChange={(event) => setSelectedRole(event.target.value)}
                            >
                                { roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        { role }
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                disabled={updateUserRootsLoading}
                                className={classes.button}
                                variant="outlined"
                                color="secondary"
                                onClick={() => fetchUpdateUserRoots({ userId: selectedUser.id, newRole: selectedRole })}
                            >
                                Update roots
                                { updateUserRootsLoading && <CircularProgress color="secondary" className={classes.circularProgress} size="30px" />}
                            </Button>
                        </>
                    </Fade>
                </div>
            </Grow>
        </Box>
    );
};

export default AdminSearch;
