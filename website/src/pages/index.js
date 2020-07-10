import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Write New Algorithms</>,
    imageUrl: 'img/undraw_pair_programming_njlp.svg',
    description: (
      <>Download and modify open source code for cochlear implant sound processors and create a new algorithm.</>
    ),
  },
  {
    title: <>Evaluate Sounds</>,
    imageUrl: 'img/undraw_my_answer_iw6k.svg',
    description: (
      <>
        Submit your algorithm for translating sound clips into samples to mimic cochlear implant processing. Samples
        will be independently judged and ranked.
      </>
    ),
  },
  {
    title: <>Clinical Trials</>,
    imageUrl: 'img/undraw_doctors_hwty.svg',
    description: (
      <>
        Successful algorithims will be used for clinical trials to help people who wear Advanced Bionic cochlear
        implants.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`${siteConfig.title}`} description="Cochlear Implant Hackathon">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <br />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--outline button--secondary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/getting_started')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className={styles.whatarecis}>
          <div className="container padding-vert--xl text--left">
            <div className="row">
              <div className="col col--4 col--offset-1">
                <h2>What are cochlear implants?</h2>
                <p>
                  Cochlear implants are amazing electrical devices that restore hearing to people who are born without
                  hearing or lose their hearing over time.
                </p>
                <br />
              </div>
              <div className="col col--5 col--offset-1">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Vm0nZH9RahE"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
