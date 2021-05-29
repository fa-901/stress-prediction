
import React, { Fragment } from "react";
import { Typography, Button, AppBar, Toolbar, CssBaseline, makeStyles } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/PhotoCamera';

// const useStyles = makeStyles((theme) => ({
// 	icon: {
// 		marginRight: theme.spacing(2),
// 	},
// }));
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pss: 0,
			txt: '',
		}
	}

	render() {

		return (
			<CssBaseline>
				<AppBar position="relative">
					<Toolbar>
						<CameraIcon />
						<Typography variant="h6" color="inherit" noWrap>
							Title
						</Typography>
					</Toolbar>
				</AppBar>
				<h1>
					Hello
				</h1>
				<Button variant="contained">this is a material UI button</Button>
			</CssBaseline>
		);
	}
}

export default App;
