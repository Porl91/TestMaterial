import * as React from 'react';
import { Typography, AppBar, Drawer, Toolbar, IconButton, Badge, List, ListItem, ListItemText, Theme, withTheme, Divider, withStyles, WithStyles, createStyles, CssBaseline, TextField, Grid, Button, FormControl, FormLabel, Paper } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/Save';
import { default as MenuIcon } from '@material-ui/icons/Menu'
import { default as NotificationsIcon } from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import { Record } from 'immutable';
import { string } from 'prop-types';

type ProductParams = {
    name: string;
    address: string;
    telephone: string;
    website: string;
};

var defaultProduct = { 
    name: '',
    address: '', 
    telephone: '', 
    website: '' 
};
export class ProductRecord extends Record<ProductParams>(defaultProduct) {
    with<TKey extends keyof ProductParams>(key: TKey, value: ProductParams[TKey]) {
        return this.set(key, value);
    }
}

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
    product: ProductRecord;
}

class BootstrapPage extends React.Component<BootstrapPageProps, BootstrapPageState> {
    constructor(props: BootstrapPageProps) {
        super(props);
        this.state = {
            sidebarOpen: props.sidebarOpen || false, 
            product: new ProductRecord()
        };
    }

    updateState<TKey extends keyof BootstrapPageState>(name: TKey, newState: BootstrapPageState[TKey]) {
        this.setState({
            [name]: newState
        } as Pick<BootstrapPageState, keyof BootstrapPageState>);
    }
    onSidebarOpen = () => this.updateState('sidebarOpen', true);
    onSidebarClose = () => this.updateState('sidebarOpen', false);
    onProductChange = (name: keyof ProductParams) => 
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                product: this.state.product.set(name, ev.currentTarget.value)
            } as Pick<BootstrapPageState, keyof BootstrapPageState>);
        };

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
                    <Grid container direction='row' sm={2}>
                        <Grid item direction='column'>
                            <Grid item xs>
                                <TextField
                                    id="outlined-name"
                                    label="Name"
                                    value={this.state.product.name}
                                    onChange={this.onProductChange('name')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-name"
                                    label="Address"
                                    value={this.state.product.address}
                                    onChange={this.onProductChange('address')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-name"
                                    label="Telephone"
                                    value={this.state.product.telephone}
                                    onChange={this.onProductChange('telephone')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-name"
                                    label="Website"
                                    value={this.state.product.website}
                                    onChange={this.onProductChange('website')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            TestField
                        </Grid>
                    </Grid>
                    {/*
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Grid container spacing={16}>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-name"
                                label="Name"
                                value={this.state.product.name}
                                onChange={this.onProductChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-name"
                                label="Address"
                                value={this.state.product.address}
                                onChange={this.onProductChange('address')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-name"
                                label="Telephone Number"
                                value={this.state.product.telephone}
                                onChange={this.onProductChange('telephone')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-name"
                                label="Website"
                                value={this.state.product.website}
                                onChange={this.onProductChange('website')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Button variant="contained" size="small">
                            <SaveIcon />
                            Save
                        </Button>
                    </Grid> */}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BootstrapPage);