// Created by: Oleksandr Bezrukov
// Creation date: 30 January 2020

// Text field which allow to select from existing items or add new.

// External imports
import React, { useState, useEffect } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: `100%`,
        '& .MuiTextField-root': {
            width: `100%`,
        },
        '& .MuiInputBase-root': {
            width: `100%`,
        },
        '& .MuiFormLabel-root': {
            fontSize: '1.3rem',
        },
    },
    list: {
        boxShadow: `0px 2px 8px 1px rgba(0,0,0,0.2)`,
        '& .MuiListItem-root': {
            paddingTop: 2,
            paddingBottom: 2,
        },
    },
}));

interface IAdvancedTextFieldProps extends StandardTextFieldProps {
    list: string[];
    value: string;
    callback: (value: string) => void;
}

const Component = ({
    value,
    list,
    callback,
    ...other
}: IAdvancedTextFieldProps) => {
    const classes = useStyles({});

    const [focused, toggleFocused] = useState<boolean>(false);

    const [itemExists, toggleItemExists] = useState<boolean>(false);

    const handleSetFocused = () => toggleFocused(true);
    const handleSetUnFocused = () => toggleFocused(false);

    useEffect(() => {
        const exists = list.some((el: string) => el.toLowerCase().startsWith(value.toLowerCase()));
        toggleItemExists(exists);
    },        [value, toggleItemExists, focused]);

    return (
        <div className={classes.root}>
            <TextField
                value={value}
                onChange={event => callback(event.target.value)}
                InputProps={{
                    onFocus: handleSetFocused,
                    onBlur: handleSetUnFocused,
                    endAdornment: (
                        <Zoom in={value.length !== 0} mountOnEnter unmountOnExit>
                            <InputAdornment position='end'>
                                <IconButton
                                    size='small'
                                    onClick={() => callback('')}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        </Zoom>
                    ),
                    startAdornment: (
                        <Zoom in={!itemExists && value.length !== 0} mountOnEnter unmountOnExit>
                            <InputAdornment position='start'>
                                <IconButton size='small'>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        </Zoom>
                    ),
                }}
                {...other}
            />
            <Collapse in={focused} className={classes.list}>
                { itemExists && (
                    <List>
                        {list
                            .filter((el: string) => el.toLowerCase().startsWith(value.toLowerCase()))
                            .map((el: string, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => callback(el)}
                                >
                                    <ListItemText>
                                        {el}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                )}
            </Collapse>
        </div>
    );
};

export default Component;
