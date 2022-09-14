/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Stack } from '@mui/material';
import ProductDescriptionCard from '../../components/ProductDescriptionCard/ProductDescriptionCard';
import RecommendedSlider from '../../components/Slider/components/recommendedSlider/SliderTwo';
import BtnBack from '../../components/ProductDescriptionCard/components/BtnBack';
import BtnForward from '../../components/ProductDescriptionCard/components/BtnForward';
import { getProduct, getProductsByCategory } from '../../api/Api';

function Product() {
	const [product, setProduct] = useState({});
	const [forwardProductId, setForwardProductId] = useState('');
	const [backProductId, setBackProductId] = useState('');
	const [quantityGoods, setQuantityGoods] = useState(1);
	const dispatch = useDispatch();
	const { id } = useParams();

	async function showProduct() {
		const responseForDisplayedProduct = await getProduct(id);
		const {
			data: {
				products: [displayedProduct],
			},
		} = responseForDisplayedProduct;

		const responseForAllCategory = await getProductsByCategory(
			displayedProduct.categories
		);
		const {
			data: { products },
		} = responseForAllCategory;

		const currentProductId = products.findIndex(
			(element) => element.itemNo === id
		);
		const forwardProd =
			typeof products[currentProductId + 1] === 'undefined'
				? 0
				: currentProductId + 1;
		setForwardProductId(`/products/${products[forwardProd].itemNo}`);

		const backProd =
			typeof products[currentProductId - 1] === 'undefined'
				? products.length - 1
				: currentProductId - 1;
		setBackProductId(`/products/${products[backProd].itemNo}`);
		setProduct(displayedProduct);
	}

	useEffect(() => {
		showProduct();
	}, []);

	useEffect(() => {
		showProduct();
	}, [id]);

	return (
		<main>
			<Stack
				direction="row"
				justifyContent="space-around"
				alignItems="center"
				sx={{
					height: { xs: '60px', sm: '80px', md: '90px', xl: '110px' },
				}}
			>
				<BtnBack backProductId={backProductId} />
				<BtnForward forwardProductId={forwardProductId} />
			</Stack>
			<ProductDescriptionCard product={product} />
			<Stack>
				<RecommendedSlider />
			</Stack>
		</main>
	);
}
export default Product;
