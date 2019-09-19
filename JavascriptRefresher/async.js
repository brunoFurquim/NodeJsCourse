const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Rodou');
        }, 4000);
    });
    return promise;
}

setTimeout(() => {
    fetchData().then((
        text => {
            console.log(text);
        }
    ))
});