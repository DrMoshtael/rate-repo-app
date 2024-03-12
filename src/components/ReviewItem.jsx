import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row"
  },
  rating: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 20
  },
  right: {
    margin: 20,
    marginLeft: 0,
    flexGrow: 1,
    flexShrink: 1
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontSize="subheading" fontWeight="bold" color="blue">
          {review.rating}
        </Text>
      </View>
      <View style={styles.right}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary" style={{ marginTop: 5, marginBottom: 10 }}>
          {format(review.createdAt, "dd'.'mm'.'yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
