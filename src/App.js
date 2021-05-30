
import React, { useState, Fragment } from "react";
import { Typography, Button, AppBar, Toolbar, CssBaseline, makeStyles, Container, Box, TextField, CircularProgress } from '@material-ui/core';
import { Assessment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	button: {
		"marginBottom": theme.spacing(5),
		"color": "#fff",
		"background": "linear-gradient(90deg, rgba(9,9,121,1) 50%, rgba(2,106,221,1) 100%)"
	},
	button2: {
		"marginBottom": theme.spacing(5),
		"marginLeft": theme.spacing(2),
		"color": "#fff",
		"background": "linear-gradient(90deg, rgba(9,9,121,1) 50%, rgba(221,2,2,1) 100%)"
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	container: {
		height: '100%',
		marginTop: theme.spacing(5)
	},
	text: {
		width: '100%',
		marginBottom: theme.spacing(2),
		resize: 'vertical'
	},
}));

function App() {
	const classes = useStyles();
	const [pss_score, set_pss] = useState(0);
	const [text, set_text] = useState('');
	const [loading, setLoad] = useState(false);
	const [showResult, setRes] = useState(false);

	function resetEvt() {
		set_text('');
		setRes(false);
	}

	function getStress(x) {
		if (x >= 0 && x <= 13)
			return "Low"
		if (x >= 14 && x <= 26)
			return "Moderate"
		if (x >= 27 && x <= 40)
			return "High"
	}
	

	function clickEvt() {
		setLoad(true)
		setRes(false);
		const url = `https://fa901x.pythonanywhere.com/getempath`
		const formData = new FormData();
		let x = text.replace(/\W/g, ' ')
		x = x.replace(/ +(?= )/g, '')
		console.log(x)
		formData.append('text', x);
		fetch(url, {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(result => {
				processResult(result.Message);
				setLoad(false);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	function processResult(emp) {
		let score = ((emp.help * 33.15) + (emp.pride * 216.8) + (emp.suffering * 1323) + (emp.journalism * -352.32) + (emp.blue_collar_job * 817.38) + (emp.reading * 1059.99997) + (emp.anonymity * -1909.6) + (emp.war * -378.3) + (emp.poor * 915.62) + (emp.pain * 835.3) + 15.96)
		set_pss(Math.round(score));
		setRes(true);
	}


	const result = (
		<Fragment>
			<h1>Your Result is: {getStress(pss_score)} <b>({pss_score})</b></h1>
		</Fragment>
	)

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
							value={text}
							onChange={(e) => { set_text(e.currentTarget.value) }}
						/>
						<Box display="flex" flexDirection='row' justifyContent="center" alignItems="center">
							<Button variant="contained" onClick={clickEvt} className={classes.button}>
								Get Your Score
							</Button>
							<Button variant="contained" onClick={resetEvt} className={classes.button2}>
								Reset Text
							</Button>
						</Box>
						{loading && <CircularProgress style={{ marginBottom: '2rem' }} />}
						{showResult && result}
					</Box>
				</Container>
			</main>
		</CssBaseline>
	);
}

export default App;
