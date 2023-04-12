import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const API_KEY = "9c1a133c-ef43-43e4-aa40-3055e9c139e4";
  const API_ENDPOINT = "https://5117hw2-03kx.api.codehooks.io/dev/todoItem";

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true); // need to change to check if logged in

  const router = useRouter();

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      })
      const data = await response.json()
      // update state -- configured earlier.
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  }, [])
  
  useEffect(() => {
    if (!(loading)) {
      router.push('/todos')
    }
  }, [loading])

  if (loading) {
    return (<span>LOGGING IN...</span>);
  } 
  //{posts[0].front}
}