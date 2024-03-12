import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepoList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        render(<RepositoryListContainer repositories={repositories} />);

        // screen.debug();
        const repoItems = screen.getAllByTestId('repoItem');
        const [firstRepoItem, secondRepoItem] = repoItems;

        expect(within(firstRepoItem).getByTestId('repoItemName')).toHaveTextContent('jaredpalmer/formik')
        expect(within(firstRepoItem).getByTestId('repoItemDesc')).toHaveTextContent('Build forms in React, without the tears')
        expect(within(firstRepoItem).getByTestId('repoItemLang')).toHaveTextContent('TypeScript')
        expect(within(firstRepoItem).getByTestId('repoItemForks')).toHaveTextContent('1.6k')
        expect(within(firstRepoItem).getByTestId('repoItemStars')).toHaveTextContent('21.9k')
        expect(within(firstRepoItem).getByTestId('repoItemRating')).toHaveTextContent('88')
        expect(within(firstRepoItem).getByTestId('repoItemReviews')).toHaveTextContent('3')

        expect(within(secondRepoItem).getByTestId('repoItemName')).toHaveTextContent('async-library/react-async')
        expect(within(secondRepoItem).getByTestId('repoItemDesc')).toHaveTextContent('Flexible promise-based React data loader')
        expect(within(secondRepoItem).getByTestId('repoItemLang')).toHaveTextContent('JavaScript')
        expect(within(secondRepoItem).getByTestId('repoItemForks')).toHaveTextContent('69')
        expect(within(secondRepoItem).getByTestId('repoItemStars')).toHaveTextContent('1.8k')
        expect(within(secondRepoItem).getByTestId('repoItemRating')).toHaveTextContent('72')
        expect(within(secondRepoItem).getByTestId('repoItemReviews')).toHaveTextContent('3')
      });
    });
  });