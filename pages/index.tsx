import gql from "graphql-tag";
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useQuery } from "urql";

const query = gql`
  query MySchema {
    __schema {
      queryType {
        fields {
          name
          type {
            name
            fields {
              name
            }
          }
        }
      }
    }
  }
`;

const queryWithoutLoc = { ...query, loc: undefined }

type Props = { title?: string }

const Home: NextPage<Props, Props> = ({ title }) => {
  const [result] = useQuery({ query: queryWithoutLoc });
  return (
    <main>
      <h1>{title}</h1>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </main>
  );
}

Home.getInitialProps = () => ({ title: "Schema" })

export default withUrqlClient(() => {
  return {
    url: 'https://graphql-pokemon2.vercel.app',
  };
})(Home);
