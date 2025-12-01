import { useState, useEffect } from "react";

import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router";

import { useCreate } from "../contexts/useCreate";
import { useAuth } from "../contexts/useAuth";
import { useMobile } from "../contexts/useMobileContext";

import ArrowBack from "@mui/icons-material/ArrowBack";

export default function BreadCrumbContainer() {
	const { productCategories, allProducts } = useCreate();
	const { admin } = useAuth();
	const { mobile } = useMobile();

	const [breadcrumbs, setBreadcrumbs] = useState([]);
	const location = useLocation();

	const dummyProdCategories = productCategories.map((cat) => cat.name);

	useEffect(() => {
		// if (location.pathname.lastIndexOf("/") === location.pathname.length - 1) {
		// 	location.pathname = location.pathname.slice(0, location.pathname.length - 1);
		// }
		const lastDash = location.pathname.lastIndexOf("/");
		const lastChar = location.pathname.length;
		let subcategory = location.pathname.slice(lastDash + 1, lastChar);
		let overcategory = location.pathname.replace(`/${subcategory}`, "");
		overcategory = overcategory.slice(
			overcategory.lastIndexOf("/") + 1,
			overcategory.length
		);

		let dummyBread = ["Home"];
		if (overcategory !== "products") dummyBread.push(overcategory);
		else {
			overcategory = "";
		}

		let singleProd;

		if (subcategory && Number(subcategory)) {
			singleProd = allProducts.filter((prod) => Number(prod.id) === Number(subcategory));
		}
		if (singleProd && singleProd.length > 0) {
			subcategory = singleProd[0].name;
		}
		if (subcategory) {
			dummyBread.push(subcategory);
		}

		if (!overcategory && !subcategory) {
			dummyBread = [];
		}

		setBreadcrumbs(dummyBread);
	}, [location]);

	return (
		<Breadcrumb
			style={!(mobile && admin) ? { margin: "40px 40px 0px 0px" } : { margin: "40px" }}
		>
			<ArrowBack
				style={{ color: "#0d6efd" }}
				sx={{ mr: 1, ml: 1, mt: 0.4 }}
				fontSize='medium'
			/>
			{breadcrumbs &&
				breadcrumbs.map((bread, i) => {
					return bread === "Home" ? (
						<span key={bread + i}>
							<Link className="link" to={admin ? "/cms/index" : "/"}>Home</Link>
						</span>
					) : dummyProdCategories.includes(bread.toLowerCase()) ? (
						<span key={bread + i}>
							<Link className="link" to={admin ? `/cms/products/${bread}` : `/products/${bread}`}>
								{bread}
							</Link>
						</span>
					) : (
						<Breadcrumb.Item key={bread + i}>
							<span className="link">{bread}</span>
						</Breadcrumb.Item>
					);
				})}
		</Breadcrumb>
	);
}
