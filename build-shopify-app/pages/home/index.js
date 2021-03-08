
import react from 'react';
//  import { useRouter } from 'next/router'

// // const Index = () => (
// //   <div>
// //     <p>Excuseme pos app</p>
// //   </div>
// // );

// // export default Index;
// // import Link from 'next/link'

// // function Home() {
// //   return (
// //     // <ul>
// //     //   <li>
// //     //     <Link href="/">
// //     //       <a>Excuseme pos app</a>
// //     //     </Link>
// //     //   </li>
// //     //   <li>
// //     //     <Link href="/about">
// //     //       <a>About Us</a>
// //     //     </Link>
// //     //   </li>
// //     // </ul>
// //   )
// // }

// // export default Home

// //import { useRouter } from 'next/router'

// export default function ReadMore() {
//   const router = useRouter()

//   return (
//     <span
//       onClick={() => {
//         router.push({
//           pathname: '/about',
//           query: { name: 'Vercel' },
//         })
//       }}
//     >
//       Click here to read more
//     </span>
//   )
// }

// //export default Page

// import { useEffect } from 'react'
// import { useRouter } from 'next/router'

// export default function Page() {
//   const router = useRouter()

//   useEffect(() => {
//     console.log("qqqqqqqqqqq");
//     router.push('/');
//     // router.beforePopState(({ url, as, options }) => {
//     //   // I only want to allow these two routes!
//     //   if (as !== '/' && as !== '/other') {
//     //     // Have SSR render bad routes as a 404.
//     //     window.location.href = as
//     //     return false
//     //   }

//     //   return true
//     // })
//   }, [])

//   return (
//     <div>
//       <p>please wait...</p>
//     </div>
//   )
// }
import { useRouter } from 'next/router'


export default function Page() {
  const router = useRouter()
  const handleClick = (e) =>  {
    console.log('Free pizza!');
    router.push('/');
  }

  return (
    <div>
        <button onClick={handleClick}>Add</button>
    </div>
  )
}