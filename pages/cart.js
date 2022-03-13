import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Link,
	Select,
	MenuItem,
	Button,
	Card,
	List,
	ListItem,
} from "@mui/material";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import NextLink from "next/link";
import Image from "next/image";

export default function Cart() {
	const { state } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	console.log("cartItems :>> ", cartItems);
	return (
		<Layout title="Shopping Cart">
			<Typography component="h1" variant="h1">
				Shopping Cart
			</Typography>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty <NextLink href="/">Go shopping</NextLink>
				</div>
			) : (
				<Grid container spacing={4}>
					<Grid md={8} xs={12} item>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align="right">
											Quantity
										</TableCell>
										<TableCell align="right">
											Price
										</TableCell>
										<TableCell align="right">
											Action
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map((item) => {
										return (
											<TableRow key={item._id}>
												<TableCell>
													<NextLink
														href={`/product/${item.slug}`}
														passHref
													>
														<Link>
															<Image
																src={item.image}
																alt={item.name}
																width={50}
																height={50}
															></Image>
														</Link>
													</NextLink>
												</TableCell>
												<TableCell>
													<NextLink
														href={`/product/${item.slug}`}
														passHref
													>
														<Link>
															<Typography>
																{item.name}
															</Typography>
														</Link>
													</NextLink>
												</TableCell>
												<TableCell align="right">
													<Select
														value={item.quantity}
													>
														{[
															...Array(
																item.countInStock
															).keys(),
														].map((x) => (
															<MenuItem
																key={x + 1}
																value={x + 1}
															>
																{x + 1}
															</MenuItem>
														))}
													</Select>
												</TableCell>
												<TableCell align="right">
													£{item.price}
												</TableCell>
												<TableCell align="right">
													<Button
														variant="contained"
														color="secondary"
													>
														X
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid md={4} xs={12} item>
						<Card>
							<List>
								<ListItem>
									<Typography variant="h2">
										Subtotal (
										{cartItems.reduce(
											(a, c) => a + c.quantity,
											0
										)}{" "}
										{cartItems.reduce(
											(a, c) => a + c.quantity,
											0
										) > 1
											? "items"
											: "item"}
										) : £
										{cartItems
											.reduce(
												(a, c) =>
													a + c.quantity * c.price,
												0
											)
											.toFixed(2)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										variant="contained"
										color="primary"
										fullWidth
									>
										Check Out
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
}
