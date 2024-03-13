import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { FlatList, View, StyleSheet, Alert, Platform } from "react-native";
import ReviewItem from "./ReviewItem";
import { Button } from 'react-native-paper'
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        paddingBottom: 10
    }
  });

const ItemSeparator = () => <View style={styles.separator} />;

const AReview = ({ item, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW);

    const doDelete = async () => {
        await deleteReview({ variables: { deleteReviewId: item.id }})
        refetch()
    }

    const handleDelete = () => {
        if (Platform.OS !== 'web') {
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                { 
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    onPress: doDelete
                }
            ])
        } else {
            if (window.confirm('Are you sure you want to delete this review?')) {
                doDelete();
            }
        }
    }

    return (
        <View>
            <ReviewItem review={item} my_review={true}/>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigate(`/${item.repositoryId}`)} buttonColor={theme.colors.primary} mode='contained'>View repository</Button>
                <Button onPress={handleDelete} buttonColor={theme.colors.error} mode='contained'>Delete review</Button>
            </View>
        </View>
        
    )
}

const MyReviews =  () => {
    const user = useQuery(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network'
    })
    const reviews = user.data ? user.data.me.reviews.edges.map(e => e.node) : []

    return (
        <FlatList 
        data={reviews}
        renderItem={({ item }) => <AReview item={item} refetch={user.refetch}/>}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default MyReviews;