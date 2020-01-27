import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import UserInfo from './userInfo';
import UserActions from './userActions';
import AccountContent from './accountContent';
import { Role } from '../../types/store/actionsCreators/mainTypes';

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
        paddingLeft: 0,
        paddingRight: 0,
    },
    title: {
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
        padding: `5px 0 5px 0`,
    },
    userInfoContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
    },
    userPanel: {
        padding: '10px 30px 10px 30px',
    },
}));

export interface User {
    id: string;
    email: string;
    userName: string;
    role: Role;
}

interface IAccount {
    user: User;
}

const Account = ({ user }: IAccount) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container
                fixed
                className={classes.container}
                component="div"
            >
                <Typography
                    className={classes.title}
                    color="primary"
                    align="center"
                    variant="h3"
                >
                    Account
                </Typography>
                <div className={classes.userPanel}>
                    <div className={classes.userInfoContainer}>
                        <UserInfo {...user} />
                        <UserActions user={user} />
                    </div>
                    <Divider />
                    <AccountContent />
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Account;
