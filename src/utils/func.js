async function timer (){
    const data =await fetch("https://dummyjson.com/quotes")
    console.log(`Api hit\n${data}`)

}

timer()
export default timer;