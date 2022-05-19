import Head from 'next/head';
import Banner from '~/components/Banner';
import Header from '~/components/Header';
import requests from '~/utils/request';
import { Movie } from '~/typings';
import Row from '~/components/Row';
import useAuth from '~/hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { modalState } from '~/atoms/modalAtom';
import Modal from '~/components/Modal';

interface Props {
    netflixOriginals: Array<Movie>;
    trendingNow: Array<Movie>;
    topRated: Array<Movie>;
    actionMovies: Array<Movie>;
    comedyMovies: Array<Movie>;
    horrorMovies: Array<Movie>;
    romanceMovies: Array<Movie>;
    documentaries: Array<Movie>;
}

export async function getServerSideProps() {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
}

const Home = ({
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
}: Props) => {
    const { loading } = useAuth();
    const showModal = useRecoilValue(modalState);

    if (loading) return 'Loading';

    return (
        <div className="relative overflow-x-hidden bg-gradient-to-b">
            <Head>
                <title>Home - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Banner netflixOriginals={netflixOriginals} />
                <section className="md:space-y-24">
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Action Thrillers" movies={actionMovies} />
                    <Row title="Comedies" movies={comedyMovies} />
                    <Row title="Scary Movies" movies={horrorMovies} />
                    <Row title="Romance Movies" movies={romanceMovies} />
                    <Row title="Documentaries" movies={documentaries} />
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    );
};

export default Home;
