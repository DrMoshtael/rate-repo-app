import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    gap: 15,
    // borderColor: 'black',
    // borderWidth: 2
  },
  topContainer: {
    flexDirection: "row",
    gap: 20,
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  detailsContainer: {
    alignItems: "flex-start",
    gap: 5,
    // borderColor: 'red',
    // borderWidth: 2,
    flexGrow: 1,
    flexShrink: 1
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  tag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderColor: 'orange',
    // borderWidth: 2
  },
  stat: {
    alignItems: "center",
  },
});

const RepoItem = ({ details }) => {
  const formatNumber = (num) => {
    if (num < 1000) return num;
    else if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
    else return `${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: details.ownerAvatarUrl }} />
        <View style={styles.detailsContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {details.fullName}
          </Text>
          <Text color='textSecondary'>{details.description}</Text>
          <Text color="white" style={styles.tag}>
            {details.language}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(details.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(details.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(details.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(details.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepoItem;
