import React, { useContext } from "react";
import Head from "next/head";
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Link,
	CssBaseline,
	Switch,
	Badge,
} from "@mui/material";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Store } from "../utils/store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
	const { state, dispatch } = useContext(Store);

	const { darkMode, cart } = state;

	const darkModeChangeHandler = () => {
		dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
		const newDarkMode = !darkMode;
		Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
	};

	const theme = createTheme({
		typography: {
			h1: {
				fontWeight: 400,
				fontSize: "1.6rem",
				margin: "1rem 0",
			},
			h2: {
				fontWeight: 400,
				fontSize: "1.4rem",
				margin: "1rem 0",
			},
			body: {
				fontWeight: "normal",
			},
		},
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: {
				main: "#f0c000",
			},
			secondary: {
				main: "#208080",
			},
		},
	});

	const classes = useStyles();
	return (
		<div>
			<Head>
				<title>{title ? `${title} - Amazona` : `Amazona`}</title>
				{description && (
					<meta name="description" content={description}></meta>
				)}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar
					position="static"
					className={classes.navbar}
					sx={{
						bgcolor: "#203040",
					}}
				>
					<Toolbar>
						<NextLink href="/" passHref>
							<Link>
								<Typography className={classes.brand}>
									Amazona
								</Typography>
							</Link>
						</NextLink>
						<div className={classes.grow}></div>
						<div>
							<Switch
								color="secondary"
								checked={darkMode}
								onChange={darkModeChangeHandler}
							>
								Dark Mode
							</Switch>
							<NextLink href="/cart" passHref>
								<Link>
									{cart.cartItems.length > 0 ? (
										<Badge
											color="secondary"
											badgeContent={cart.cartItems.length}
										>
											Cart
										</Badge>
									) : (
										"Cart"
									)}
								</Link>
							</NextLink>
							<NextLink href="/login" passHref>
								<Link>Login</Link>
							</NextLink>
						</div>
					</Toolbar>
				</AppBar>
				<Container className={classes.main}>{children}</Container>
				<footer className={classes.footer}>
					<Typography>All rights reserved Amazona.</Typography>
				</footer>
			</ThemeProvider>
		</div>
	);
}
