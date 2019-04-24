import * as React from 'react';
import { Typography, AppBar, Drawer, Toolbar, IconButton, Badge, List, ListItem, ListItemText, Theme, withTheme, Divider, withStyles, WithStyles, createStyles, CssBaseline } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { default as MenuIcon } from '@material-ui/icons/Menu'
import { default as NotificationsIcon } from '@material-ui/icons/Notifications';
import classNames from 'classnames';

// type BootstrapParams = {
//     name: string;
//     sidebarOpen: boolean;
// };

// export class BootstrapRecord extends Record<BootstrapParams>({ name: '', sidebarOpen: false }) {
//     with<TKey extends keyof BootstrapParams>(key: TKey, value: BootstrapParams[TKey]) {
//         return this.set(key, value);
//     }
// }

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

export interface BootstrapPageProps extends WithStyles<typeof styles> {
    sidebarOpen?: boolean;
}

export interface BootstrapPageState {
    sidebarOpen: boolean;
}

class BootstrapPage extends React.Component<BootstrapPageProps, BootstrapPageState> {
    constructor(props: BootstrapPageProps) {
        super(props);
        this.state = {
            sidebarOpen: props.sidebarOpen || false
        };
    }

    updateSidebarOpen(newState: boolean) {
        this.setState({
            sidebarOpen: newState
        });
    }
    onSidebarOpen = () => this.updateSidebarOpen(true);
    onSidebarClose = () => this.updateSidebarOpen(false);

    render() {
        const { classes } = this.props;
        const { sidebarOpen } = this.state;

        return (
            <div className={classes.root}>
                <AppBar 
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: sidebarOpen
                    })}
                    >
                    <Toolbar disableGutters={!sidebarOpen}>
                        <IconButton
                            aria-label="Open drawer"
                            onClick={this.onSidebarOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: sidebarOpen
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap>Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer 
                    variant="persistent" 
                    anchor="left"
                    open={sidebarOpen} 
                    onClose={this.onSidebarClose}
                    className={classes.drawer} 
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.onSidebarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: sidebarOpen,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam.
                    </Typography>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BootstrapPage);