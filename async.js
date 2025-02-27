// network (XML) request - rest API
const template = (callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200 ){
            const data = JSON.parse(request.responseText);
            callback(undefined, data);
        }else if(request.readyState === 4){
            callback('could not fetch data', undefined);
        }
    });
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
    request.send();
}

template((err, data) => {
    if(err){
        console.log(err);      
    }else {
        console.log(data);     
    }
});

// callback hell
const template2 = (resource, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200 ){
            const data = JSON.parse(request.responseText);
            callback(undefined, data);
        }else if(request.readyState === 4){
            callback('could not fetch data', undefined);
        }
    });
    request.open('GET', resource);
    request.send();
}

template2('json/olawale.json', (err, data) => {
        console.log(data); 
        template2('json/panucci.json', (err, data) => {
            console.log(data); 
            template2('json/switch.json', (err, data) => {
                console.log(data);     
        });    
    });    
});

// promises
const template3 = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200 ){
                const data = JSON.parse(request.responseText);
                resolve(data);
            }else if(request.readyState === 4){
                reject('error getting resource');
            }
        });
        request.open('GET', resource);
        request.send();     
    });
    
}
template3('json/olawale.json').then(data =>{
    console.log('promise resolved:', data);
}).catch(
    err =>{
        console.log('promise rejected:', err);
    }
)

// chaining promises
const template4 = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200 ){
                const data = JSON.parse(request.responseText);
                resolve(data);
            }else if(request.readyState === 4){
                reject('error getting resource');
            }
        });
        request.open('GET', resource);
        request.send();     
    });
    
}
template4('json/olawale.json').then(data =>{
    console.log('promise 1 resolved:', data);
    return template4('json/panucci.json')
}).then(data => {
    console.log('promise 2 resolved:', data);
    return template4('json/switch.json')
}).then(data =>{
    console.log('promise 3 resolved:', data);
}).catch(
    err =>{
        console.log('promise rejected:', err);
    }
);

// fetch API
fetch('json/olawale.json').then((response) => {
    console.log('resolved', response);
    return response.json();
}).then(data =>{
    console.log(data);
}).catch(err =>{
    console.log('rejected', err);   
})

// async & await
const template5 = async () => {
    const response = await fetch('json/switch.json');

    if(response.status !==200){
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();
    return data;
};

template5()
    .then(data => console.log('resolved:', data))
    .catch(err => console.log('rejected:', err.message));
