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

export default function Home(props) {
	const { products } = props;
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
									<Button size="small" color="primary">
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
