
import React, { useState } from "react";
import { Typography, Button, AppBar, Toolbar, CssBaseline, makeStyles, Container, Box, TextField } from '@material-ui/core';
import { CameraIcon, Assessment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	button: {
		"marginBottom": theme.spacing(5),
		"color": "#fff",
		"backgroundColor": "#21D4FD",
		"backgroundImage": "linear-gradient(270deg, #21D4FD 0%, #B721FF 86%)"
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	container: {
		height: '100%',
		marginTop: theme.spacing(10)
	},
	text: {
		width: '100%',
		marginBottom: theme.spacing(2),
		resize: 'vertical'
	},
}));

function App() {
	const classes = useStyles();

	return (
		<CssBaseline>
			<AppBar position="relative">
				<Toolbar>
					<Assessment className={classes.icon} />
					<Typography variant="h6" color="inherit" noWrap>
						Stress Predictor
					</Typography>
				</Toolbar>
			</AppBar>
			<main>
				<Container maxWidth="sm" className={classes.container}>
					<Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
						<TextField
							className={classes.text}
							label="Add Text Here"
							multiline
							rows={6}
							variant="outlined"
						/>
						<Button variant="contained" className={classes.button}>
							Get Your Score
						</Button>
					</Box>
				</Container>
			</main>
		</CssBaseline>
	);
}

export default App;
