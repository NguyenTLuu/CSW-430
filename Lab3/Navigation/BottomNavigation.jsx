import * as React from "react";
import { Text } from "react-native";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import Products from "../Components/Products";
import Add from "../Components/Product_Add";
import Search from "../Components/Product_Search";
import Detail from "../Components/Product_Detail";

const ProductRoute = () => <Products />;
const AddRoute = () => <Add />;
const SearchRoute = () => <Search />;
const DetailRoute = () => <Detail />;

export default function MyBottomNavigation() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: "product",
            title: "Products",
            focusedIcon: "view-list",
            unfocusedIcon: "view-list-outline",
        },
        { key: "add", title: "Add", focusedIcon: "plus" },
        { key: "search", title: "Search", focusedIcon: "magnify" },
        { key: "detail", title: "Detail", focusedIcon: "details" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        product: ProductRoute,
        add: AddRoute,
        search: SearchRoute,
        detail: DetailRoute,
    });

    return (
        <PaperProvider>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </PaperProvider>
    );
}
