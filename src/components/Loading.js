import { CircularProgress } from '@material-ui/core'
import React from 'react'

const Loading = () => {
    return (
        <section style={{
            width:"100%",
            height:"100vh",
            display:"flex",
           alignItems:"center",
           justifyContent:"center "
          }}><CircularProgress color="secondary" style={{
              lineHeight:"100vh"
          }}/></section>
    )
}

export default Loading;
