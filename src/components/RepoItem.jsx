import { View, Text } from "react-native";

const RepoItem = ({ details, styles }) => (
    <View style={styles.item}>
        <Text>Full name: {details.fullName}</Text>
        <Text>Description: {details.description}</Text>
        <Text>Language: {details.language}</Text>
        <Text>Stars: {details.stargazersCount}</Text>
        <Text>Forks: {details.forksCount}</Text>
        <Text>Reviews: {details.reviewCount}</Text>
        <Text>Rating: {details.ratingAverage}</Text>
    </View>
)

export default RepoItem;