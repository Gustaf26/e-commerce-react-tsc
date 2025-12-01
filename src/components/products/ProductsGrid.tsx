
import { useAuth } from "../../contexts/useAuth";
import { useCreate } from "../../contexts/useCreate";
import { useMobile } from "../../contexts/useMobileContext";

import MobileList from "../../cms_components/MobileList";
import useMobileStyles from "../../hooks/useMobileStyles";

import Navigation from "../Navigation";
import ProductCard from "./ProductCard";
import CardContainer from "./CardContainer";
import BreadcrumbContainer from "../BreadCrumbContainer";

import Icon from "@mui/material/Icon";


const ProductsGrid = ({ products, type }) => {

	const { admin } = useAuth();
	const { setProductOption } = useCreate();
	const { mobile, mobileDisplays, setMobileDisplays } = useMobile();

	const { containerStyles, microMobile } = useMobileStyles();

	return (
		<>
			<div id="dummy-container-products"
				className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
					admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
				onClick={(e) => {
					if ((e.target as HTMLElement).id === "dummy-container-products") setMobileDisplays(false);
				}}
			>
				{((admin && microMobile) || (admin && !mobile)) && <Navigation />}
				{!(admin && mobile) && <BreadcrumbContainer />}

				<div className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
					admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
					onLoad={(e) => {
						setProductOption(type);
					}}
					style={mobile && admin && !microMobile ? { ...containerStyles } : {}}>
					{(admin && mobile && !microMobile) && <Navigation />}

					{mobile && admin && !microMobile && (
						<Icon
							className='icon-mobile-displays'
							onClick={() => setMobileDisplays(!mobileDisplays)}
							color='primary'
							style={{ zIndex: '1000 !important' }}
						>
							device_unknown
						</Icon>
					)}

					{mobileDisplays && <MobileList />}

					<CardContainer>
						{products &&
							products.map((item, i) => (
								<ProductCard
									index={i}
									id={item.id}
									key={item.id}
									item={item}
								/>
							))}
					</CardContainer>
				</div>
			</div>
		</>
	);
};

export default ProductsGrid;
