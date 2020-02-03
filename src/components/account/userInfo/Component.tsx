import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typograhpy from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ToolTip from '@material-ui/core/Tooltip';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getRandomColor } from '../../../utils/getRandomColor';
import { trim } from '../../../utils/trimString';
import { User } from '../Component';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
        backgroundColor: getRandomColor(),
        width: 60,
        height: 60,
    },
    userInfoWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    userData: {
        marginLeft: 15,
    },
    typography: {
        color: '#333',
        fontSize: '1rem',
    },
}));

const UserInfo = ({ email, userName, id, role }: User) => {
    const classes = useStyles();

    const [copied, toggleCopied] = useState<boolean>(false);
    const [trimmedId, setTrimmedId] = useState<string>(id);

    useEffect(() => {
        setTrimmedId(trim(id, 10));
    },        [id]);

    return (
        <Box className={classes.userInfoWrapper}>
            <Avatar className={classes.avatar} src="./img/avatar.jpg">
                {userName ? userName[0] : 'S'}
            </Avatar>
            <Box className={classes.userData}>
                <Typograhpy variant="h5" className={classes.typography}>
                    UserName: {userName}
                </Typograhpy>
                <Typograhpy variant="h5" className={classes.typography}>
                    Email: {email}
                </Typograhpy>
                <ToolTip title={`${id}. Press on id to copy.`} arrow leaveDelay={300}>
                    <Typograhpy variant="h5" className={classes.typography}>
                        <CopyToClipboard
                            onCopy={() => {
                                toggleCopied(true);
                                window.setTimeout(() => {
                                    toggleCopied(false);
                                },                500);
                            }}
                            text={id}
                        >
                            <span>User ID: {trimmedId}</span>
                        </CopyToClipboard>
                        <Fade in={copied}>
                            <Typograhpy component="span" color="primary">
                                Copied!
                            </Typograhpy>
                        </Fade>
                    </Typograhpy>
                </ToolTip>
            </Box>
        </Box>
    );
};

export default UserInfo;
