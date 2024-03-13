import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews =  () => {
    const user = useQuery(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network'
    })
    const reviews = user.data ? user.data.me.reviews.edges.map(e => e.node) : []

    return (
        <FlatList 
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} my_review={true}/>}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default MyReviews;