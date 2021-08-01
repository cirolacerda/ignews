import Head from 'next/head'

import style from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title> Início | ig.news</title>
      </Head>
      <h1 className={style.title}>
        Hello <span>World</span>
      </h1>
    </>
  )
}
