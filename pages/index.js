import React, { useContext } from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Link,
} from "@mui/material";
import Layout from "/components/Layout";
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/product";
import axios from "axios";
import { Store } from "../utils/store";
import { useRouter } from "next/router";

export default function Home(props) {
	const { products } = props;
	const { state, dispatch } = useContext(Store);
	const router = useRouter();

	const addToCartHandler = async (product) => {
		const existItem = state.cart.cartItems.find(
			(item) => item._id === product._id
		);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			window.alert("Product is is out of stock");
		}

		dispatch({
			type: "CART_ADD_ITEM",
			payload: { ...product, quantity: quantity },
		});
		router.push("/cart");
	};
	return (
		<Layout>
			<div>
				<h1>products</h1>

				<Grid container spacing={3}>
					{products.map((product) => (
						<Grid item md={4} key={product.name}>
							<Card>
								<NextLink
									href={`/product/${product.slug}`}
									passHref
								>
									<CardActionArea>
										<CardMedia
											component="img"
											image={product.image}
											title={product.title}
										/>
									</CardActionArea>
								</NextLink>

								<CardContent>
									<NextLink
										href={`/product/${product.slug}`}
										passHref
									>
										<Link>
											<Typography>
												{product.name}
											</Typography>
										</Link>
									</NextLink>
								</CardContent>

								<CardActions>
									<Typography>${product.price}</Typography>
									<Button
										size="small"
										color="primary"
										onClick={() =>
											addToCartHandler(product)
										}
									>
										Add to cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find({}).lean();
	await db.disconnect();

	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
