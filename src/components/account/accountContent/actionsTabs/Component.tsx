import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { User } from '../../Component';
import AdminSearch from './adminSearch';
import { Divider } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    value: any;
    index: any;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
);

interface ActionsTabsProps {
    user: User;
}

const a11yProps = (index: any) => ({
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
});

const ActionsTabs = ({ user }: ActionsTabsProps) => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="scrollable account actions tabs"
            >
                { user.role === 'ADMIN' && <Tab
                    label="Admin roots"
                    {...a11yProps(0)}
                />}
            </Tabs>
            { user.role === 'ADMIN' &&
                <TabPanel
                    value={value}
                    index={0}
                >
                    <AdminSearch />
                </TabPanel>
            }
        </>
    );
};

export default ActionsTabs;
